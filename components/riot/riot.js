import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

//TODO: Error handling

const RIOT_TOKEN = process.env.RIOT_TOKEN;

const optionsHeader = {
    headers: {
        'X-Riot-Token': RIOT_TOKEN
    }
};

export const getSummonerDetails = async (region, summonerName) => {
    const summonersByNameURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    try {
        const summonerData = await axios.get(summonersByNameURL, optionsHeader);
        return summonerData.data
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

export const getSummonerRankedDetails = async(region, summonerName) => {
    if (region === 'euw' || region === 'na')
        region += '1';
    try {
        const summonerDetails = await getSummonerDetails(region, summonerName);
        const summonerId = summonerDetails.id;
        const summonerRankedDetailsURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`
        const summonerRankedDetails = await axios.get(summonerRankedDetailsURL, optionsHeader);
        return summonerRankedDetails.data
    } catch (e) {
        console.log(e.message);
        return null;
    }

}

export const getSummonerActiveGame = async(region, summonerName) => {
    if (region === 'euw' || region === 'na')
        region += '1';
    try {
        const summonerDetails = await getSummonerDetails(region, summonerName);
        const summonerId = summonerDetails.id;
        console.log(summonerId);
        const summonerActiveGameDetailsURL = `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`
        console.log(summonerActiveGameDetailsURL)
        const summonerActiveGameDetails = await axios.get(summonerActiveGameDetailsURL, optionsHeader);
        return summonerActiveGameDetails.data
    } catch (e) {
        console.log(e.message);
        return null;
    }
};


export const formatSummonerRankedDetails = (details) => {
    //TODO: empty classes
    let queueType = "";
    let res = `**Ranked details for ${details[0].summonerName}**\n`
    let rank = "";
    let wl = "";
    details.forEach(elem => {
        if (elem.queueType === 'RANKED_FLEX_SR') {
            queueType = "Ranked Flex";
        } else if (elem.queueType === 'RANKED_SOLO_5x5') {
            queueType = "Ranked Solo/Duo";
        } 
        rank = `${elem.tier} ${elem.rank} ${elem.leaguePoints} LP`;
        wl =  `${elem.wins} W / ${elem.losses} L`;
        res += `${queueType}: ${rank} (${wl})\n`;
    })
    return res;
};


export const summonerRankedDetails = async(region, summonerName) => {
    return formatSummonerRankedDetails(await getSummonerRankedDetails(region, summonerName))
};