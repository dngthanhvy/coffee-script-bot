import Discord from "discord.js" 

const generalHelp = () => {
    const embed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setDescription('Use !help [command] to get more infos on it!')
    .setAuthor('Coffee Script command list')
    .addFields(
        {name: '!help', value:'A list of all commands'},
        {name: '!cat', value:'A random cat fact or cat pic'},
        {name: '!gif', value:'Search a gif or get a random gif'},
        {name: '!quote', value:'A random quote from a random author'},
        {name: '!twitch', value:'Some infos from Twitch'},
        {name: '!league', value:'Some infos from League of Legends'}
    )
    return embed;
};

const help = () => {
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setAuthor('!help command')
    .setDescription('Some additional details about the !help command')
    .addFields(
        {name: '!help', value: 'Shows the list of all available commands.'},
        {name: '!help [command]', value: 'Additional infos of the command.'});
    
    return helpEmbed;
};

const cat = () => {
    const catEmbed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setAuthor('!cat command')
    .setDescription('Some additional details about the !cat command')
    .addFields(
        {name: '!cat', value: 'A combo of a random cat fact and a random cat picture.'},
        {name: '!cat pic', value: 'A random cat picture.'},
        {name: '!cat fact', value: 'A random cat fact.'});
    
    return catEmbed;
};

const gif = () => {
    const gifEmbed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setAuthor('!gif command')
    .setDescription('Tenor gifs')
    .addFields(
        {name: '!gif', value: 'A random gif from the trending gif list.'},
        {name: '!gif [search]', value: 'A random gif from the list of the search query.'});
    
    return gifEmbed;
};

const quote = () => {
    const quoteEmbed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setAuthor('!quote command')
    .setDescription('Quote generator. More functionalities incoming!')
    .addFields(
        {name: '!quote', value: 'A random quote from a random celebrity.'});

    return quoteEmbed;
};

const twitch = () => {
    const twitchEmbed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setAuthor('!twitch command')
    .setDescription("Informations fetched from Twitch's API")
    .addFields(
        {name: '!twitch [username]', value: 'Live status of a a twitch user.'});

    return twitchEmbed;
};

const league = () => {
    const leagueEmbed = new Discord.MessageEmbed()
    .setColor('#71CA6D')
    .setAuthor('!league command')
    .setDescription("League of Legends game informations. Regions currently supported: EUW and NA")
    .addFields(
        {name: '!league summoner [region] [summoner name]', value: 'Informations of a specific summoner.'},
        {name: '!league register [region] [summoner name]', value: 'Register a summoner name linked to your discord ID on the database. See !league me'},
        {name: '!league me', value: 'Informations of the summoner linked to your discord ID.'},
        {name: '!league delete', value: 'Delete your discord ID from the database.'});
    
    return leagueEmbed;
};


export default {
    generalHelp,
    help,
    twitch,
    league,
    cat,
    gif,
    quote
}