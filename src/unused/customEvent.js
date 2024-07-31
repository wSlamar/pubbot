const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const { adminChannel } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../events/client/embeds.js');
const { valorantRole } = process.env;
const { amoungUsRole } = process.env;
const { phasmophobiaRole } = process.env;
const { jackboxRole } = process.env;
const { localGamesRole } = process.env;
const { lethalCompanyRole } = process.env;
const { tableTopRole } = process.env;
const { localGamesChannel } = process.env;
const { mojitoGamesChannel } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mojito-custom")
        .setDescription("Command for creating a Custom Game event")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption((option) => option
            .setName("event-title")
            .setDescription("title of the event")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("game-name")
            .setDescription("name of the game")
            .setRequired(true)
            .addChoices(
                { name: 'Among Us', value: 'Among Us' },
                { name: 'Jackbox', value: 'Jackbox' },
                { name: 'Phasmophobia', value: 'Phasmophobia' },
                // { name: 'Dungeons & Dragons', value: 'Dungeons & Dragons' },
                { name: 'Valorant', value: 'Valorant' },
                { name: 'Lethal Company', value: 'Lethal Company' },
                { name: 'Tabletop Simulator', value: 'Tabletop Simulator' },
            )
        )
        .addIntegerOption((option) => option
            .setName("player-count")
            .setDescription("number of players")
            .setRequired(true)
            .addChoices(
                { name: '2 Players', value: 2 },
                { name: '3 Players', value: 3 },
                { name: '4 Players', value: 4 },
                { name: '5 Players', value: 5 },
                { name: '6 Players', value: 6 },
                { name: '7 Players', value: 7 },
                { name: '8 Players', value: 8 },
                { name: '9 Players', value: 9 },
                { name: '10 Players', value: 10 },
                { name: '11 Players', value: 11 },
                { name: '12 Players', value: 12 },
                { name: '13 Players', value: 13 },
                { name: '14 Players', value: 14 },
                { name: '15 Players', value: 15 },
                { name: '16 Players', value: 16 },
                { name: '17 Players', value: 17 },
                { name: '18 Players', value: 18 },
                { name: '19 Players', value: 19 },
                { name: '20 Players', value: 20 }
            )
        )
        .addIntegerOption((option) => option
            .setName("event-month")
            .setDescription("month of the event")
            .setRequired(true)
            .addChoices(
                { name: 'January', value: 1 },
                { name: 'Feburary', value: 2 },
                { name: 'March', value: 3 },
                { name: 'April', value: 4 },
                { name: 'May', value: 5 },
                { name: 'June', value: 6 },
                { name: 'July', value: 7 },
                { name: 'August', value: 8 },
                { name: 'September', value: 9 },
                { name: 'October', value: 10 },
                { name: 'November', value: 11 },
                { name: 'December', value: 12 },
            )
        )
        .addIntegerOption((option) => option
            .setName("event-day")
            .setDescription("day of the event")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("event-hour")
            .setDescription("hour of the event")
            .setRequired(true)
            .addChoices(
                { name: '1', value: '01' },
                { name: '2', value: '02' },
                { name: '3', value: '03' },
                { name: '4', value: '04' },
                { name: '5', value: '05' },
                { name: '6', value: '06' },
                { name: '7', value: '07' },
                { name: '8', value: '08' },
                { name: '9', value: '09' },
                { name: '10', value: '10' },
                { name: '11', value: '11' },
                { name: '12', value: '12' },
            )
        )
        .addStringOption((option) => option
            .setName("event-minute")
            .setDescription("minute of the event")
            .setRequired(true)
            .addChoices(
                { name: '00', value: '00' },
                { name: '05', value: '05' },
                { name: '10', value: '10' },
                { name: '15', value: '15' },
                { name: '20', value: '20' },
                { name: '25', value: '25' },
                { name: '30', value: '30' },
                { name: '35', value: '35' },
                { name: '40', value: '40' },
                { name: '45', value: '45' },
                { name: '50', value: '50' },
                { name: '55', value: '55' },
            )
        )
        .addStringOption((option) => option
            .setName("event-am-pm")
            .setDescription("am or pm")
            .setRequired(true)
            .addChoices(
                { name: 'AM', value: 'AM' },
                { name: 'PM', value: 'PM' },
            )
        )
        .addStringOption((option) => option
            .setName("event-timezone")
            .setDescription("timezone that you are currently in")
            .setRequired(true)
            .addChoices(
                { name: 'Eastern Standard Time (EST)', value: 'America/New_York' },
                { name: 'Pacific Standard Time (PST)', value: 'America/Los_Angeles' },
                { name: 'Mountain Standard Time (MST)', value: 'America/Denver' },
                { name: 'Central Standard Time (CST)', value: 'America/North_Dakota/New_Salem' },
            )
        )
        .addStringOption((option) => option
            .setName("player-emoji")
            .setDescription("emoji that will be associated with the player reaction")
            .setRequired(true)
        )
        .addChannelOption((option) => option
            .setName("event-voice-channel")
            .setDescription("voice channel that the event will take place in")
            .setRequired(true)
        ),

    async execute(interaction, client) {
        let estDateLog = new Date()

        // Converts the given date to the specified timezone. If the date is a string, it first converts it to a Date object.
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
        }

        console.log('\x1b[36m', `/mojito-custom has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')

        function createPlayerMap(numPlayers) {
            const playerMap = new Map();
            for (let i = 1; i <= numPlayers; i++) {
                const playerKey = `Player${i}`;
                const playerValue = [`[PLAYER ${i} OPEN SPOT]`, `PLAYER ${i} ID`, "[EMPTY SPOT]"];
                playerMap.set(playerKey, playerValue);
            }
            return playerMap;
        }

        const playerMap = createPlayerMap(interaction.options.getInteger("player-count"));
        const eventChannel = interaction.options.getChannel("event-voice-channel");
        let eventPing;
        const playCount = interaction.options.getInteger("player-count");
        const gameName = interaction.options.getString("game-name");
        let lobbyRunner = interaction.user.username

        // If the member has a nickname, use it as the lobby runner
        if (interaction.member.nickname !== null) {
            lobbyRunner = interaction.member.nickname
        }

        const gameDetails = {
            "Among Us": {
                image: "https://wallpapers.com/images/featured/among-us-cb21ldue3llceiua.jpg",
                emoji: "🔴",
                pingRole: `<@&${amoungUsRole}>`,
                roleId: amoungUsRole
            },
            "Jackbox": {
                image: "https://static-cdn.jtvnw.net/jtv_user_pictures/eafc2679-857a-409e-9d11-ae6d76aeaf0f-channel_offline_image-1920x1080.png",
                emoji: "🤡",
                pingRole: `<@&${jackboxRole}>`,
                roleId: jackboxRole
            },
            "Phasmophobia": {
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/capsule_616x353.jpg?t=1702309974",
                emoji: "👻",
                pingRole: `<@&${phasmophobiaRole}>`,
                roleId: phasmophobiaRole
            },
            // "Dungeons & Dragons": {
            //   image: "https://i.redd.it/0rwen7nbalcz.jpg",
            //   emoji: "🐉",
            //   pingRole: `<@&${danddRole}>`,
            //   roleId: danddRole
            // },
            "Valorant": {
                image: "https://wallpaper.forfun.com/fetch/34/34fcf4edbca5e75d4d31967a6b49373e.jpeg",
                emoji: "🔫",
                pingRole: `<@&${valorantRole}>`,
                roleId: valorantRole
            },
            "Tabletop Simulator": {
                image: "https://eltabbjournal.com/wp-content/uploads/2022/07/tabletop-simulator-logo-1024x576.jpg",
                emoji: "🎲",
                pingRole: `<@&${tableTopRole}>`,
                roleId: tableTopRole
            },
            "Lethal Company": {
                image: "https://gaming-cdn.com/images/products/15274/orig/lethal-company-pc-game-steam-cover.jpg?v=1699271176",
                emoji: "👹",
                pingRole: `<@&${lethalCompanyRole}>`,
                roleId: lethalCompanyRole
            }
        };
        const { image, emoji, pingRole, roleId } = gameDetails[gameName];
        eventImage = image;
        eventPing = pingRole;
        embedDiscription = `${emoji} **${gameName.toUpperCase()} GAME EVENT** ${emoji}`;

        let channelComannd = client.channels.cache.get(interaction.channelId);

        const replyMessage = await interaction.reply({
            content: `**CUSTOM GAME COMMAND REMINDERS:**\n🔸 You can react with the 📌 emoji to send a reminder message in the local games channel.\n🔸 Admins can react with the 🔨 emoji to remove a player manually if needed.`,
            ephemeral: true
        });

        const message = await channelComannd.send({
            content: `${eventPing}`,
            embeds: [embeds.customsEmbed],
            fetchReply: true,
        });

        // This line updates the permissions for the 'leagueRole' to view the 'eventChannel', and then sets the user limit of the channel to 11.
        eventChannel.setUserLimit(playCount + 2).then(() => eventChannel.permissionOverwrites.edit(localGamesRole, { ViewChannel: true }));

        const eventTitle = interaction.options.getString("event-title").toUpperCase();
        const prePlayerEmoji = interaction.options.getString("player-emoji");
        let playerEmoji;

        // This code is extracting the emoji name from the prePlayerEmoji string.
        // If the string includes a colon, it means it's a custom emoji in the format <:emojiName:emojiId>, so it splits the string by the colon and takes the second element (the emoji name).
        // If the string doesn't include a colon, it means it's a standard emoji, so it just uses the original string.
        playerEmoji = prePlayerEmoji.includes(':') ? prePlayerEmoji.split(':')[1] : prePlayerEmoji;

        let eventMonth = interaction.options.getInteger("event-month").toString();
        let eventDay = interaction.options.getInteger("event-day").toString();
        let eventYear = "2024"
        let eventAmPm = interaction.options.getString("event-am-pm").toString();
        let eventMinute = interaction.options.getString("event-minute").toString();
        let eventHour = interaction.options.getString("event-hour");
        let eventTimezone = interaction.options.getString("event-timezone");

        // The zeroPad function is used to ensure that the day and month are always two digits. If the day or month is a single digit, it adds a leading zero.
        const zeroPad = (num, places) => String(num).padStart(places, '0');
        if (eventDay.toString().length == 1) {
            eventDay = zeroPad(eventDay, 2);
        }
        if (eventMonth.toString().length == 1) {
            eventMonth = zeroPad(eventMonth, 2);
        }

        let timeStandard = `${eventHour}:${eventMinute} ${eventAmPm}`

        // This function converts time from 12-hour format to 24-hour format. It splits the input time into hours and minutes, and adjusts the hours based on the AM/PM modifier.
        const convertTime12to24 = (time12h) => {
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') {
                hours = '00';
            }
            if (modifier.toLowerCase() === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}:${minutes}`;
        }

        const timeMilitary = `${convertTime12to24(timeStandard)}:00`
        const eventDayMomentUnix = momentTZ.tz(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`, `${eventTimezone}`).unix()
        let messageContent = `${eventPing} this **${gameName}** event will start <t:${eventDayMomentUnix}:R>`

        // This code block first attempts to react to a message with a pre-defined emoji. If an error occurs, it checks the error code. 
        // If the error code is not 10008 (message not found), it logs the error. For a specific error code (10014, unknown emoji), 
        // it stops the collector, sends a follow-up interaction with an embed, and attempts to delete the original message. 
        // If deleting the message fails with an error other than 10008, it logs that error. Finally, it attempts to add a "❌" reaction to the message, 
        // logging any errors except for the 10008 error code.
        message.react(prePlayerEmoji).catch(error => {
            if (error.code !== 10008) {
                console.error('Error on player emoji:', error);
                if (error.code === 10014) {
                    collector.stop();
                    interaction.followUp({
                        embeds: [embeds.emojiEmbed],
                        ephemeral: true
                    });
                    message.delete().catch(error => {
                        if (error.code !== 10008) {
                            console.error('Error on removing message with unknown emoji', error);
                        }
                    });
                }
            }
        });
        message.react("❌").catch(error => { if (error.code !== 10008) { console.error('Error on X reaction:', error); } });

        // Defines a filter function for reactions that only allows reactions with the playerEmoji or a "❌"..
        const filter = (reaction, user) => {
            const validEmojis = [playerEmoji, "❌", "🔨", "📌"];
            return validEmojis.includes(reaction.emoji.name);
        };

        // This event is triggered when a reaction is collected. It logs the reaction, user, and time.
        // It then checks if the user is already in the playerMap. If not, and the reaction is a team emoji, it adds the user to the corresponding team.
        // If the reaction is "❌", it removes the user from the playerMap and their reactions from the message.
        // It also removes duplicate users from the same team.
        const collector = message.createReactionCollector({ filter, dispose: true });
        collector.on("collect", async (reaction, user) => {
            estDateLog = new Date()
            console.log('\x1b[36m', '/mojito-custom:', '\x1b[32m', `Collected [${reaction.emoji.name}] from [${user.tag}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m');
            const fullUserName = user.tag.toString();
            const userNameID = user.id.toString();
            usernameNoTag = fullUserName.substring(0, fullUserName.length - 5);

            const valuesArray = [];
            async function checkIDs(nameID) {
                for (const [key, value] of playerMap) {
                    valuesArray.push(value.includes(nameID))
                }
            }
            checkIDs(userNameID);

            for (let i = 1; i <= playCount; i++) {
                if (reaction.emoji.name === playerEmoji && playerMap.get(`Player${i}`).includes(`[PLAYER ${i} OPEN SPOT]`) && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                    playerMap.set(`Player${i}`, [`<@${userNameID}>`, userNameID, fullUserName]);
                    checkIDs(userNameID);
                    break;
                }
            }

            if (reaction.emoji.name === "❌" && usernameNoTag !== "Mojito") {
                setDefault(userNameID);
                removeUserReactions(userNameID);
            }

            refreshEmbed()

            const member = message.guild.members.cache.get(userNameID);
            if (reaction.emoji.name === "📌" && usernameNoTag !== "Mojito") {
                message.reactions.cache.get("📌").remove();
                if (member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                    let countOfEmpty = Array.from(playerMap.values()).filter(value => value[2] === '[EMPTY SPOT]').length;
                    if (countOfEmpty > 0) {
                        const channel = client.channels.cache.get(localGamesChannel);
                        let spotsText = countOfEmpty === 1 ? "spot" : "spots";
                        let reminder = await channel.send({
                            content: `${eventPing} There ${countOfEmpty === 1 ? "is" : "are"} **${countOfEmpty}** ${spotsText} open in the **${gameName}** event! Go to <#${mojitoGamesChannel}> to sign up!`,
                        });
                    }
                }
            }

            if (reaction.emoji.name === "🔨" && usernameNoTag !== "Mojito") {
                message.reactions.cache.get("🔨").remove();
                if (member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                    const channel = client.channels.cache.get(adminChannel);
                    const playerSelectMenu = new StringSelectMenuBuilder()
                        .setCustomId('playerSelect')
                        .setPlaceholder('Select a player to remove')
                        .addOptions(
                            Array.from(playerMap.entries())
                                .filter(([key, value]) => value[2] !== "[EMPTY SPOT]")
                                .map(([key, value], index) => ({
                                    label: value[2],
                                    value: `Player${index + 1}`,
                                }))
                        );

                    const row = new ActionRowBuilder().addComponents(playerSelectMenu);

                    let modMessage = await channel.send({
                        content: `<@${userNameID}> What player would you like to remove?\n`,
                        components: [row]
                    });

                    const filter = (interaction) => interaction.customId === 'playerSelect' && interaction.user.id === userNameID;
                    const collector = channel.createMessageComponentCollector({ filter, time: 60000 });

                    collector.on('collect', async (interaction) => {
                        const selectedValue = interaction.values[0];
                        let tempPlayer = playerMap.get(selectedValue)[2];
                        removeUserReactions(playerMap.get(selectedValue)[1]);
                        setDefault(playerMap.get(selectedValue)[1]);
                        await interaction.update({ content: `The player **${tempPlayer}** has been removed from **${eventTitle}**.`, components: [] });
                        collector.stop()
                    });

                    collector.on('end', collected => {
                        if (!collected.size) modMessage.edit({ content: 'No selection was made.', components: [] });
                    });
                }
            }

            // This function removes all reactions from a user (duplicateUser) on a message.
            // It first filters the reactions on the message to only those that the user has reacted to.
            // Then it iterates over these reactions and removes the user's reaction.
            // If there's an error during this process, it logs the error message.
            async function removeUserReactions(duplicateUser) {
                const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(duplicateUser));
                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(duplicateUser);
                    }
                } catch (error) {
                    console.error('Error on removing reacitons.');
                }
            }

            // This function sets the default values for a user in the playerMap.
            // It iterates over the entries in the playerMap. If the value of an entry includes the user, it updates the value of that entry.
            // The player number is extracted from the key, and the team color is determined based on whether the key includes "blue" or not.
            // The value is then set to an array with the default values, and the embed is refreshed.
            async function setDefault(user) {
                for (const [key, value] of playerMap) {
                    if (value.includes(user)) {
                        const playerNumber = key.replace('Player', '');
                        playerMap.set(key, [`[PLAYER ${playerNumber} OPEN SPOT]`, `PLAYER ${playerNumber} ID`, "[EMPTY SPOT]"]);
                        refreshEmbed();
                    }
                }
            }
        });

        // This event is triggered when the collector stops collecting reactions.
        collector.on("end", (collected) => {
            console.log('\x1b[36m', '/mojito-custom:', '\x1b[31m', `Collected ${collected.size} total emoji reactions`, '\x1b[0m');
        });

        const eventDayMoment = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`);
        const second = 1000;

        // This function sets up an interval that counts down to the event start time.
        // The countDownFn function checks the current time against the event start time.
        // If the event start time has passed, it clears the interval and starts the event or stops the collector, depending on the time span.
        // If the event start time is not valid, it stops the interval and sends an error message.
        // The startEvent function stops the collector, creates an invite to the event channel, and sends a message that the event has started.
        // The stopIntervalWithError function stops the collector, clears the interval, sends an error message, and deletes the message.
        // The handleError function logs any errors that occur, unless the error code is 10008 (which means the message was already deleted).
        // The interval is set to run the countDownFn function every second.
        async function intervals() {
            let interval;
            const countDownFn = () => {
                const today = convertTZ(`${moment()}`, `${eventTimezone}`)
                const timeSpan = eventDayMoment.diff(today);
                if (timeSpan <= -today || timeSpan <= 0) {
                    clearInterval(interval);
                    collector.stop();
                    if (timeSpan <= 0) {
                        eventChannel.createInvite()
                            .then(invite => message.reply({
                                content: `${eventPing} **${eventTitle}** event has started!\n All players will join ${invite}`
                            })).catch(handleError);

                        messageContent = `${eventPing}`

                        message.edit({ content: `${messageContent}` }).catch(handleError);

                        delayEdit();
                    }
                    return;
                } else if (!eventDayMoment.isValid()) {
                    collector.stop();
                    clearInterval(interval);

                    interaction.followUp({
                        embeds: [embeds.formatEmbed],
                        ephemeral: true
                    });
                    message.delete().catch(handleError);
                }
            };

            const handleError = (error) => {
                if (error.code !== 10008) {
                    console.error('Error:', error);
                }
            };

            interval = setInterval(countDownFn, second);
        }

        intervals();

        // This function stops the reaction collector after a delay of 20 minutes. It uses the setTimeout function to schedule the collector.stop() call.
        async function delayEdit() {
            setTimeout(() => {
                collector.stop()
            }, 20 * 60 * 1000);
        }

        // Splits the player list into two columns for balanced display in the embed, ensuring an even distribution of player names.
        function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#167301')
                .setTitle(`  ${eventTitle}  \n──────────────────────────────────────────`)
                .setDescription(embedDiscription)
                .setImage(eventImage)
                .setFooter({ text: `This event was created by ${lobbyRunner}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` });

            let playerList1 = '';
            let playerList2 = '';

            const totalPlayers = playerMap.size;
            const playersPerList = Math.ceil(totalPlayers / 2);

            let playerCounter = 1;
            playerMap.forEach((value, key) => {
                const playerInfo = `🔸 ${value[0]}\n`;
                if (playerCounter <= playersPerList) {
                    playerList1 += playerInfo;
                } else {
                    playerList2 += playerInfo;
                }
                playerCounter++;
            });

            customsEmbed.addFields(
                { name: `⏰  **START TIME:** <t:${eventDayMomentUnix}:F>  ⏰`, value: ` ` },
                { name: `🔊  **VOICE CHANNEL:** ${eventChannel}  🔊`, value: ` ` },
                { name: ' ', value: ` `, inline: false },
                { name: `${prePlayerEmoji} ──── PLAYERS ──── ${prePlayerEmoji}`, value: playerList1.trim(), inline: true },
                { name: `${prePlayerEmoji} ──── PLAYERS ──── ${prePlayerEmoji}`, value: playerList2.trim(), inline: true }
            );

            message.edit({ embeds: [customsEmbed], content: `${messageContent}`, }).catch(error => {
                collector.stop();
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    },
}