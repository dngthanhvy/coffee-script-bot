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

The bot will then send an embed message with the SOLO Q and FLEX Q ranked tiers with the number of wins and losses.

### Simplify your own summoner lookup requests

The user can register to be on a (local) list with his own summoner name. By doing so, he can use `!league me` command to fetch his own summoner infos.

To register: `!league register <region> <summoner name>`
To delete: `!league delete`

IMPORTANT: A file named `users.json` must be created at the project's root, initialized with an empty array `[]`.

## Cat facts and pictures

Upon request, a random cat fact (fetched from a list of 5 daily facts) or a random cat picture will be sent back by the bot.

Command: `!cat fact` or `!cat pic`

## Quotes

The user can request a random quote with `!quote`

To be implemented: search by author