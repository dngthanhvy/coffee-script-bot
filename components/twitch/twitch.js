import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();
import { embedTwitchLive, embedTwitchOff } from './utils.js'

const config = {
    headers: {
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
        'client-id': process.env.TWITCH_CLIENT_TOKEN
    }
};


const getUserInformation = async(userLogin) => {
    try {
        const fetchedUserInfos = await axios.get(`https://api.twitch.tv/helix/users?login=${userLogin}`, config)
        return fetchedUserInfos.data.data[0]
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

const getChannelInformation = async(userId) => {
    try {
        const channelInfos = await axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${userId}`, config);
        return channelInfos.data.data[0];
    } catch(e) {
        console.log(e.message);
        return null;
    }
};

const getStreamInformation = async(userLogin) => {
    try {
        const streamInfos = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${userLogin}`, config);
        return streamInfos.data.data[0];
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

const embedStreamInformation = async(userLogin) => {
    const allInfos = await Promise.all([
        getUserInformation(userLogin),
        getStreamInformation(userLogin)
    ])
    const [userInfos, streamInfos] = allInfos;
    
    if (!userInfos) return 'Streamer not found on Twitch. Did you type in the correct username?'
    else if (!streamInfos) return embedTwitchOff(userInfos);
    else return embedTwitchLive(streamInfos, userInfos);
}




export default {
    getUserInformation,
    getChannelInformation,
    getStreamInformation,
    embedStreamInformation
}