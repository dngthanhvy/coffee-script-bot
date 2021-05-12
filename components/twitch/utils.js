import Discord from 'discord.js';
import Twitch from './twitch.js';

const embedTwitchLive = (streamInfo, userInfos) => {
    const user = userInfos;
    const stream = streamInfo;
    const streamThumbnail = stream.thumbnail_url.replace(`{width}x{height}.jpg`, '') + `400x300.jpg`;
    const embed = new Discord.MessageEmbed()
    .setTitle(stream.user_name + ' is live!' )
    .setDescription(stream.title)
    .setThumbnail(user.profile_image_url)
    .setImage(streamThumbnail)
    .setURL(`https://www.twitch.tv/${stream.user_login}`)
    .addFields(
        { name: 'Game', value: stream.game_name, inline: true },
		{ name: 'Viewers', value: stream.viewer_count, inline: true },
    )
    return embed;
};

const embedTwitchOff = (userInfos) => {
    const user = userInfos;
    const embed = new Discord.MessageEmbed()
    .setTitle(user.display_name + ' is offline...' )
    .setDescription(user.description)
    .setThumbnail(user.profile_image_url)
    .setImage(user.offline_image_url)
    .setURL(`https://www.twitch.tv/${user.login}`)
    .addFields(
        { name: 'Viewers', value: user.view_count, inline: true },
        { name: 'Created at', value: user.created_at.slice(0, 10), inline: true }
    )

    return embed;
};

export {
    embedTwitchLive,
    embedTwitchOff
}