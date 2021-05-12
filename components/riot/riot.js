import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { formatSummonerRankedDetails, embedSummonerRankedDetails } from './utils.js'

//TODO: Error handling

const RIOT_TOKEN = process.env.RIOT_TOKEN;

const optionsHeader = {
    headers: {
        'X-Riot-Token': RIOT_TOKEN
    }
};

const getSummonerDetails = async (region, summonerName) => {
    const summonersByNameURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    try {
        const summonerData = await axios.get(summonersByNameURL, optionsHeader);
        return summonerData.data
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

const getSummonerRankedDetails = async(region, summonerName) => {
    if (region === 'euw' || region === 'na')
        region += '1';
    
    const summonerDetails = await getSummonerDetails(region, summonerName);
    
    try {
        const summonerId = summonerDetails.id;
        const summonerRankedDetailsURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`
        const summonerRankedDetails = await axios.get(summonerRankedDetailsURL, optionsHeader);
        return summonerRankedDetails.data
    } catch (e) {
        console.log(e.message);
        return null;
    }

}

const getSummonerActiveGame = async(region, summonerName) => {
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

const summonerRankedDetails = async(region, summonerName) => {
    return formatSummonerRankedDetails(await getSummonerRankedDetails(region, summonerName))
};

export default {
    getSummonerDetails,
    getSummonerRankedDetails,
    formatSummonerRankedDetails,
    summonerRankedDetails,
    embedSummonerRankedDetails
}