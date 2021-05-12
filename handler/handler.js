import {Riot, Tenor, Cat, Twitch} from '../components/components.js';
import { formatJSON, markdownJSON } from './utils.js';

const sayHello = async (msg, params) => {
    await msg.reply('Hello!');
};

const leagueHandler = async (msg, ...params) => {

    const regions = [
        'euw',
        'na'
    ]

    const command = params[0].toLowerCase();

    switch(command) {
        case 'embed':
            await msg.channel.send(Riot.embedSummonerRankedDetails());
            break;

        case 'summoner':
            const region = params[1].toLowerCase();
            if (!regions.includes(region)){
                await msg.channel.send('Are you sure you typed in the wrong region?');
                return;
            }
            const summonerName = encodeURI(params.slice(2).join(" "));

            const summoner = await Riot.ranked(region, summonerName);
            if (!summoner) {
                await msg.channel.send("Summoner not found");
                return;
            } else {
                await msg.channel.send(Riot.embedSummonerRankedDetails(summoner));
                return;
            }

        default:
            await msg.channel.send('Wrong command, check your typo!');
            break; 
    }

    
};

const gifHandler = async (msg, ...params) => {
    if (![...params])
        await msg.channel.send(await Tenor.randomGifSearch());
    else
        await msg.channel.send(await Tenor.gifSearch(encodeURI(params.join(' '))));
};


const catHandler = async (msg, ...params) => {
    const cat = params[0].toLowerCase();
    if (cat === 'fact') {
        await msg.channel.send(await Cat.getCatFact());
    } else if (cat === 'pic') {
        await msg.channel.send(await Cat.getRandomCatPic());
    }
};

const twitchHandler = async (msg, ...params) => {
    const twitchUser = params[0].toLowerCase();
    await msg.channel.send(await Twitch.embedStreamInformation(twitchUser))
};

const help = async (msg, ...params) => {
    const commandList = [
        ['help', 'list all commands'],
        ['cat <option>', 'random cat pic (option = pic) or fact (option = fact)'],
        ['gif <(optional) search queries>', 'random gif or search gif on TENOR'],
        ['league summoner <region> <user>', 'infos on a specific summoner'],
        ['twitch <user>', 'fetch the live status of a channel']
    ];

    let res = "";
    commandList.forEach(command => res += `!${command[0]}: ${command[1]}` + '\n');
    await msg.channel.send(markdownJSON(res))
}

const commandList = [
    ['hello', sayHello],
    ['gif', gifHandler],
    ['league', leagueHandler],
    ['cat', catHandler],
    ['twitch', twitchHandler],
    ['help', help]
];

const commandHandler = async (msg) => {
    if (msg.content[0] === "!"){
        try {
            const formattedLine = msg.content.split(" ").filter(e => {
                return e !== '';
            })
            const command = formattedLine[0].substring(1);
            const params = formattedLine.splice(1);

            for (let c of commandList) {
                if (command === c[0]) {
                    await c[1](msg, ...params);
                }
            }
        } catch (e) {
            console.log(e.message);
            return null;
        }
    }
};

export default commandHandler;