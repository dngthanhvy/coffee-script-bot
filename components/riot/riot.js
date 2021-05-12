import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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



export default {
    summoner,
    ranked,
    embedSummonerRankedDetails
}