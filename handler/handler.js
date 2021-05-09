import {Riot, Tenor} from '../components/components.js';

const formatJSON = (JSONres) => {
    return JSON.stringify(JSONres, null, 2);
};

const markdownJSON = (string) => {
    return " ```json\n"+string+"\n```";
};

const sayHello = async (msg, params) => {
    await msg.channel.send('Hello!');
};

const leagueHandler = async (msg, ...params) => {
    const leagueInfo = params[0].toLowerCase();
    const region = params[1].toLowerCase();
    const summonerName = encodeURI(params.slice(2).join(" "));

    if (leagueInfo === "summoner") {
        const rankedRes = await Riot.summonerRankedDetails(region, summonerName);
        if (rankedRes) {
            await msg.channel.send(rankedRes);
        } else {
            await msg.channel.send('Could not find the summoner details.')
        }
    } else if (leagueInfo === "currentgame") {
        const currentGameRes = await Riot.getSummonerActiveGame(region, summonerName);
        if (currentGameRes) {
            console.log(currentGameRes)
            await msg.channel.send(markdownJSON(formatJSON(currentGameRes)));
        } else {
            await msg.channel.send('The game does not exist.')
        }
    } else if (leagueInfo === "matchhistory") {
        //TODO: get match history + get details on each of them + format them
    }
};

const gifHandler = async (msg, ...params) => {

    if (![...params])
        await msg.channel.send(await Tenor.randomGifSearch());
    else
        await msg.channel.send(await Tenor.gifSearch(...params));
};

const lpCalculator = async() => {

};

const commandList = [
    ['hello', sayHello],
    ['gif', gifHandler],
    ['league', leagueHandler],
    ['lp', lpCalculator]
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