# A discord bot written in Node.js

Cleaner version of an existing repository (archived).

## Twitch streamer search

The user can request a twitch streamer to get their live status with `!twitch <username>`.

WIP: the user can request the bot to watch for live statuses of a list of specific streamers. Once their live status changes, the bot will notify in the correct channel.

## Tenor GIF Search

The user can request the bot for either a random gif search or a specific gif search.

Command: `!gif <params>`

If there is no parameter, the bot will execute a random gif search based on the current trending gifs.

## League Of Legends

### Summoner lookup

The ranked stats for a summoner can be requested.

Command: `!league summoner <region> <summoner name>`

The bot will then send a message with the SOLO Q and FLEX Q ranked tiers, the LP along with the number of wins and losses.

### Active game lookup

The user can request the active game of a player.

Command: `!league active <region> <summoner name>`

### Last 10 matches history

The user can request the last 10 matches of a player.

Command: `!league log <region> <summoner name>`

## Cat facts and pictures

Upon request, a random cat fact (fetched from a list of 5 daily facts) or a random cat picture will be sent back by the bot.

Command: `!cat fact` or `!cat pic`
