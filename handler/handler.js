import {Riot, Tenor, Cat, Twitch, Quotes, Help} from '../components/components.js';
import { formatJSON, markdownJSON } from './utils.js';

const sayHello = async (msg, params) => {
    await msg.reply('Hello!');
};

const waffles = async (msg, params) => {
    await msg.channel.send('You should order some waffles at https://deliveroo.fr/fr/menu/strasbourg/centre-cathedrale/waffle-factory-strasbourg-arcades-gaufre')
};

const ntm = async (msg, params) => {
    const barroso = '336254157629685763';
    const hamada = '344253529835438090';
    await msg.channel.send(`NTM <@${barroso}> et <@${hamada}>`)
}

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
                await msg.channel.send('Are you sure you typed in the right region?');
                return;
            }
            const summonerName = encodeURI(params.slice(2).join(" "));
            if(!summonerName) {
                await msg.channel.send('Il est où le summoner name pd');
            }

            const summoner = await Riot.ranked(region, summonerName);
            if (!summoner) {
                await msg.channel.send("Summoner not found");
                return;
            } else {
                await msg.channel.send(Riot.embedSummonerRankedDetails(summoner));
                return;
            }
        case 'me':
            const registeredResponse = Riot.isRegisteredMember(msg.author.id);
            if (registeredResponse) {
                const region = registeredResponse.region;
                const summonerName = encodeURI(registeredResponse.name);
                const summoner = await Riot.ranked(region, summonerName);
                if (!summoner) {
                    await msg.channel.send("Summoner not found");
                    return;
                } else {
                    await msg.channel.send(Riot.embedSummonerRankedDetails(summoner));
                    return;
                }
            } else {
                await msg.reply('You are not registered yet. Please register with !league register <region> <summoner name>');
            }
            break;
        case 'register':
            const registerRegion = params[1].toLowerCase();
            if (!registerRegion) {
                await msg.channel.send('Are you sure you typed in the right region?');
                return;
            }
            const registerSummonerName = params.slice(2).join(" ");
            await msg.channel.send(Riot.registerMember(msg.author.id, registerRegion, registerSummonerName));
            return;
        case 'delete':
            await msg.channel.send(Riot.deleteMember(msg.author.id));
            break;
        default:
            await msg.channel.send('Wrong command, check your typo!');
            break; 
    }

    
};

const gifHandler = async (msg, ...params) => {
    if (params.length === 0){
        await msg.channel.send(await Tenor.randomGifSearch());
    }
    else
        await msg.channel.send(await Tenor.gifSearch(encodeURI(params.join(' '))));
};


const catHandler = async (msg, ...params) => {
    if (params.length === 0) {
        const allCat = await Promise.all([
            Cat.getCatFact(),
            Cat.getRandomCatPic()
        ]);
        await msg.channel.send(allCat[0]);
        await msg.channel.send(allCat[1]);
        return;
    }
    else {
        switch(params[0].toLowerCase()) {
            case 'pic':
                await msg.channel.send(await Cat.getRandomCatPic());
                return;
            case 'fact':
                await msg.channel.send(await Cat.getRandomCatFact());
                return;
            default:
                await msg.channel.send('Wrong command! Pls check again');
                return;
        }
    }
};

const twitchHandler = async (msg, ...params) => {
    if (params.length === 0) {
        await msg.channel.send('Please enter a username');
        return;
    }
    const twitchUser = params[0].toLowerCase();
    await msg.channel.send(await Twitch.embedStreamInformation(twitchUser))
};

const helpHandler = async (msg, ...params) => {
    if (params.length === 0) {
        await msg.channel.send(Help.generalHelp());
    } else {
        const command = params[0].toLowerCase();
        switch (command) {
            case 'help':
                await msg.channel.send(Help.help());
                return;
            case 'quote':
                await msg.channel.send(Help.quote());
                return;
            case 'cat':
                await msg.channel.send(Help.cat());
                return;
            case 'gif':
                await msg.channel.send(Help.gif());
                return;
            case 'twitch':
                await msg.channel.send(Help.twitch());
                return;
            case 'league':
                await msg.channel.send(Help.league());
                return;
            default:
                await msg.channel.send('Invalid command.');
                return;
        }
    }
};

const quoteHandler = async(msg, ...params) => {
    if (params.length === 0) {
        await msg.channel.send(await Quotes.getRandomQuote())
    }
}

const commandList = [
    ['hello', sayHello],
    ['gif', gifHandler],
    ['league', leagueHandler],
    ['cat', catHandler],
    ['twitch', twitchHandler],
    ['help', helpHandler],
    ['quote', quoteHandler],
    ['waffles', waffles],
    ['ntm', ntm]
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