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

const embedSummonerRankedDetails = (details) => {

    
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Summoner Name`)
	.setURL('https://discord.js.org/')
	.setDescription('Tier')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Flex 5v5', value: 'Some value here', inline: true },
		{ name: 'Wins/Losses', value: 'Some value here', inline: true },
        { name: '\u200B', value: '\u200B' },

	)
    .addFields(
		{ name: 'Solo/Duo 5v5', value: 'Some value here', inline: true },
		{ name: 'Wins/Losses', value: 'Some value here', inline: true },
	)
	.setImage('https://i.imgur.com/wSTFkRM.png');

    return exampleEmbed;
}

export {
    formatSummonerRankedDetails,
    embedSummonerRankedDetails
}