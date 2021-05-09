import Discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const coffeeScript = new Discord.Client();

const connect = (client) => {
    client.login(process.env.DISCORD_TOKEN).catch(e => console.log(e.message));
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
      });
};

const onEvent = (client) => {
    client.on("message", (msg) => {
        if(msg.author.bot)
            return
    });
}


export {
    coffeeScript,
    connect,
    onEvent
}