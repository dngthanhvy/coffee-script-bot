import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { formatSummonerRankedDetails, embedSummonerRankedDetails } from './utils.js'

//TODO: Error handling

const RIOT_TOKEN = process.env.RIOT_TOKEN;

const config = {
    headers: {
        'X-Riot-Token': RIOT_TOKEN
    }
};

const regionFormat = (region) => {
    return `${region}1`;
};

const summoner = async(region, summonerName) => {
    const newRegion = regionFormat(region);
    
    try {
        const summonerData = await axios.get(`https://${newRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, config)
        return summonerData.data;
    } catch(e) {
        console.log(e.message);
        return null;
    }
}

const ranked = async(region, summonerName) => {
    const newRegion = regionFormat(region);
    const summonerObject = await summoner(region, summonerName);
    const summonerId = summonerObject.id;
    const rankedData = {
        name: summonerObject.name,
        region: region.toUpperCase(),
        level: summonerObject.summonerLevel,
        profileIcon: summonerObject.profileIconId,
        soloq: {},
        flexq: {},
    };

    try {
        const summonerRes = await axios.get(`https://${newRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, config);

        if(summonerRes.data.length < 1) {
            rankedData.soloq.tier_rank = 'Unranked';
            rankedData.flexq.tier_rank = 'Unranked';
            rankedData.soloq.wl = 'N/A';
            rankedData.flexq.wl = 'N/A';
            return rankedData;
        } else {
            summonerRes.data.forEach(element => {
                if (element.queueType === 'RANKED_SOLO_5x5') {
                    rankedData.soloq.tier = element.tier;
                    rankedData.soloq.rank = element.rank;
                    rankedData.soloq.wl = `${element.wins}W/${element.losses}L`;
                    rankedData.soloq.tier_rank = `${element.tier} ${element.rank}`;
                } else {
                    rankedData.flexq.tier = element.tier;
                    rankedData.flexq.rank = element.rank;
                    rankedData.flexq.wl = `${element.wins}W/${element.losses}L`;
                    rankedData.flexq.tier_rank = `${element.tier} ${element.rank}`;
                }
            });

            if(Object.keys(rankedData.flexq).length === 0) {
                rankedData.flexq.tier_rank = 'Unranked';
                rankedData.flexq.wl = 'N/A';
            } else if (Object.keys(rankedData.soloq).length === 0) {
                rankedData.soloq.tier_rank = 'Unranked';
                rankedData.soloq.wl = 'N/A';
            }

            return rankedData;
        }

    } catch (e) {
        console.log(e.message);
        return null;
    }

};

const isRegisteredMember = (discordUserId) => {

    const registeredList = JSON.parse(fs.readFileSync('users.json'));

    for (let member of registeredList) {
        if (member.discordID === discordUserId) {
            member.isRegistered = true;
            return member;
        }
    }
    return null;

}

const registerMember = (discordUserId, region, summonerName) => {
    
    const newUser = {
        name: summonerName,
        region: region, 
        discordID: discordUserId
    };

    const isRegistered = isRegisteredMember(discordUserId);
    if (isRegistered) {
        return "You're already registered. Delete your own data first before changing your summoner name with !league delete.";
    } else {
        const registeredList = JSON.parse(fs.readFileSync('users.json'));
        const newList = [
            ...registeredList,
            newUser
        ];
        fs.writeFileSync('users.json', JSON.stringify(newList))
        return "You're now registered!";
    }
}

const deleteMember = (discordUserId) => {

    const isRegistered = isRegisteredMember(discordUserId);
    if (isRegistered) {
        const registeredList = JSON.parse(fs.readFileSync('users.json'));
        const newList = registeredList.filter(member => member.discordID !== discordUserId);
        fs.writeFileSync('users.json', JSON.stringify(newList))
        return "Ok! You're no longer in the VIP list.";    
    } else {
        return "You can't delete your data because you're not registered yet.";


    }
}



export default {
    summoner,
    ranked,
    isRegisteredMember,
    registerMember,
    deleteMember,
    embedSummonerRankedDetails
}