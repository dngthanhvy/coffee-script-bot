import Discord from 'discord.js';

const formatSummonerRankedDetails = (details) => {
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

const embedSummonerRankedDetails = (summonerObject) => {

    const user = summonerObject;

    const thumbnailURL = `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${user.profileIcon}.png`;

    const opGGURL = `https://${user.region.toLowerCase()}.op.gg/summoner/userName=${encodeURI(user.name)}`

    const embed = new Discord.MessageEmbed()
    .setTitle(user.name)
    .setThumbnail(thumbnailURL)
    .setURL(opGGURL)
    .setDescription(`${user.region} - Level ${user.level}`)
    .addFields(
        {name: 'Solo/Duo', value: user.soloq.tier_rank, inline: true},
        {name: 'Win/Losses', value: user.soloq.wl, inline: true},
        { name: '\u200B', value: '\u200B' },

    )
    .addFields(
        {name: 'Flex 5v5', value: user.flexq.tier_rank, inline: true},
        {name: 'Win/Losses', value: user.flexq.wl, inline: true}
    )
    return embed;
}

export {
    formatSummonerRankedDetails,
    embedSummonerRankedDetails
}