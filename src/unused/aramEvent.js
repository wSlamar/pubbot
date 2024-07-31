const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const { adminChannel } = process.env;
const { verifiedRole } = process.env;
const { leagueChatChannel } = process.env;
const { mojitoAramChannel } = process.env;
const { aramEmoji } = process.env;
const { leagueRole } = process.env;
const { customARAMrole } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");
const { clearInterval } = require("timers");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../events/client/embeds.js')
const { logChannel } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mojito-aram")
        .setDescription("Command for creating a Custom ARAM event")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption((option) => option
            .setName("event-title")
            .setDescription("title of the event")
            .setRequired(true)
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
            .setName("event-image")
            .setDescription("image that will be associated with the event")
            .setRequired(true)
            .addChoices(
                { name: 'Custom ARAM (still image)', value: 'https://i.imgur.com/JXd3vFV.png' },
                { name: 'Custom ARAM (animated gif)', value: 'https://media1.tenor.com/images/eb0d426a21704bc561d8c5822f4eacfd/tenor.gif?itemid=27606843' },
                { name: 'Saint Patricks Day', value: 'https://i.imgur.com/YYtOFvP.png' },
                { name: 'Christmas', value: 'https://i.imgur.com/J7EtAdM.png' },
                { name: 'Halloween', value: 'https://i.imgur.com/gpmSHOc.png' },
                { name: '420', value: 'https://i.imgur.com/VmSOrtY.png' },
                { name: 'Valentines Day', value: 'https://i.imgur.com/4PPf7Wf.png' },
                { name: '4th of July', value: 'https://i.imgur.com/UimNKTW.png' },
            )
        )
        .addStringOption((option) => option
            .setName("team-1-emoji")
            .setDescription("emoji that will be associated with the team 1 reaction")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("team-2-emoji")
            .setDescription("emoji that will be associated with the team 2 reaction")
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

        console.log('\x1b[36m', `/mojito-aram has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')

        const playerMap = new Map([
            ["bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]"]],
            ["bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]"]],
            ["bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]"]],
            ["bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]"]],
            ["bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]"]],
            ["redPlayer1", ["[PLAYER 1 OPEN SPOT]", "RED PLAYER 1 ID", "[EMPTY SPOT]"]],
            ["redPlayer2", ["[PLAYER 2 OPEN SPOT]", "RED PLAYER 2 ID", "[EMPTY SPOT]"]],
            ["redPlayer3", ["[PLAYER 3 OPEN SPOT]", "RED PLAYER 3 ID", "[EMPTY SPOT]"]],
            ["redPlayer4", ["[PLAYER 4 OPEN SPOT]", "RED PLAYER 4 ID", "[EMPTY SPOT]"]],
            ["redPlayer5", ["[PLAYER 5 OPEN SPOT]", "RED PLAYER 5 ID", "[EMPTY SPOT]"]],
        ]);

        const eventChannel = interaction.options.getChannel("event-voice-channel");
        const eventPing = `<@&${customARAMrole}>`
        let lobbyRunner = interaction.user.username

        // If the member has a nickname, use it as the lobby runner
        if (interaction.member.nickname !== null) {
            lobbyRunner = interaction.member.nickname
        }

        let channelComannd = client.channels.cache.get(interaction.channelId);

        // const modInfoEmbed = new EmbedBuilder()
        //     .setColor('#167301')
        //     .addFields(
        //         {
        //             name: `🔨  REMOVING A PLAYER MANUALLY  🔨`,
        //             value: `You can react with the hammer emoji to remove a player manually if needed. Only moderators have permissions to perform this action.\n‎`,
        //         },
        //         {
        //             name: `📌  REMINDER PING AND INFO MESSAGE  📌`,
        //             value: `You can react with the pushpin emoji to send a reminder message in league-chat. Moderators and Bar Nuts have permissions to perform this action.`,
        //         },
        //     )

        const replyMessage = await interaction.reply({
            content: `**ARAM COMMAND REMINDERS:**\n🔸 You can react with the 📌 emoji to send a reminder message in the league chat channel.\n🔸 Admins can react with the 🔨 emoji to remove a player manually if needed.`,
            ephemeral: true
        });

        const message = await channelComannd.send({
            content: `${eventPing}`,
            embeds: [embeds.customsEmbed],
            fetchReply: true,
        });

        // This line updates the permissions for the 'leagueRole' to view the 'eventChannel', and then sets the user limit of the channel to 15.
        eventChannel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }).then(() => eventChannel.setUserLimit(15));

        const eventTitle = interaction.options.getString("event-title").toUpperCase();
        const eventImage = interaction.options.getString("event-image");
        const preTeam1Emoji = interaction.options.getString("team-1-emoji");
        const preTeam2Emoji = interaction.options.getString("team-2-emoji");
        let team1Emoji;
        let team2Emoji

        // This code is extracting the emoji names from the preTeam1Emoji and preTeam2Emoji strings.
        // If the string includes a colon, it means it's a custom emoji in the format <:emojiName:emojiId>, so it splits the string by the colon and takes the second element (the emoji name).
        // If the string doesn't include a colon, it means it's a standard emoji, so it just uses the original string.
        team1Emoji = preTeam1Emoji.includes(':') ? preTeam1Emoji.split(':')[1] : preTeam1Emoji;
        team2Emoji = preTeam2Emoji.includes(':') ? preTeam2Emoji.split(':')[1] : preTeam2Emoji;

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
            if (modifier === 'PM' || modifier === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}:${minutes}`;
        }

        const timeMilitary = `${convertTime12to24(timeStandard)}:00`
        const eventDayMomentUnix = momentTZ.tz(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`, `${eventTimezone}`).unix()
        let messageContent = `${eventPing} this Custom ARAM event will start <t:${eventDayMomentUnix}:R>`

        // This function handles errors that occur when dealing with reactions. 
        // If the error code is 10014, it stops the collector, sends a follow-up message with an emoji embed, and attempts to delete the message. 
        // If the error code is not 10008, it logs the error.
        function handleReactionError(error, team) {
            if (error.code == 10014) {
                collector.stop();
                interaction.followUp({
                    embeds: [embeds.emojiEmbed],
                    ephemeral: true
                });
                message.delete().catch(error => {
                    if (error.code !== 10008) {
                        console.error(`Error on removing message with unknown emoji for team ${team}`, error);
                    }
                });
            }
            if (error.code !== 10008) {
                console.error(`Error on team ${team} emoji:`, error);
            }
        }

        // This code adds reactions to the message. It adds the preTeam1Emoji, preTeam2Emoji, and a "❌" emoji. 
        // If there's an error while adding the reaction (other than error code 10008), it calls the handleReactionError function and logs the error.
        message.react(preTeam1Emoji).catch(error => handleReactionError(error, 1));
        message.react(preTeam2Emoji).catch(error => handleReactionError(error, 2));
        message.react("❌").catch(error => { if (error.code !== 10008) { console.error('Error on X reaction:', error); } });

        // This function is a filter for reactions. It checks if the emoji used in the reaction is one of the valid emojis.
        // The valid emojis are stored in an array and include the team1Emoji, team2Emoji, "❌", "🔨", and "📌".
        // It returns true if the emoji used in the reaction is in the array of valid emojis, and false otherwise.
        const filter = (reaction, user) => {
            const validEmojis = [team1Emoji, team2Emoji, "❌", "🔨", "📌"];
            return validEmojis.includes(reaction.emoji.name);
        };

        // This event is triggered when a reaction is collected. It logs the reaction, user, and time.
        // It then checks if the user is already in the playerMap. If not, and the reaction is a team emoji, it adds the user to the corresponding team.
        // If the reaction is "❌", it removes the user from the playerMap and their reactions from the message.
        // If the reaction is "📌" and the user has the MuteMembers permission, it sends a reminder about open spots in the lobby.
        // If the reaction is "🔨" and the user has the ViewAuditLog permission, it sends a message to the admin channel for player removal.
        // It also removes duplicate users from the same team.
        const collector = message.createReactionCollector({ filter, dispose: true });
        collector.on("collect", async (reaction, user) => {
            estDateLog = new Date()
            console.log('\x1b[36m', '/mojito-aram:', '\x1b[32m', `Collected [${reaction.emoji.name}] from [${user.tag}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m');
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

            const emojiPlayerMap = {
                [team1Emoji]: ["bluePlayer1", "bluePlayer2", "bluePlayer3", "bluePlayer4", "bluePlayer5"],
                [team2Emoji]: ["redPlayer1", "redPlayer2", "redPlayer3", "redPlayer4", "redPlayer5"]
            };

            for (const [emoji, players] of Object.entries(emojiPlayerMap)) {
                if (reaction.emoji.name === emoji && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                    for (const player of players) {
                        if (playerMap.get(player).includes(`[PLAYER ${player.slice(-1)} OPEN SPOT]`)) {
                            playerMap.set(player, [`<@${userNameID}>`, userNameID, fullUserName]);
                            checkIDs(userNameID);
                            break;
                        }
                    }
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
                    const countOfEmpty = Array.from(playerMap.values()).filter(value => value[2] === '[EMPTY SPOT]').length;
                    if (countOfEmpty > 0) {
                        const channel = client.channels.cache.get(leagueChatChannel);
                        const reminder = await channel.send({
                            content: `${eventPing} There ${countOfEmpty === 1 ? 'is' : 'are'} **${countOfEmpty}** ${countOfEmpty === 1 ? 'spot' : 'spots'} open in the Custom ARAM event! Go to <#${mojitoAramChannel}> to sign up! ${aramEmoji}`,
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
                                .filter(([key, value]) => !value.includes("[EMPTY SPOT]"))
                                .map(([key, value], index) => {
                                    const teamColor = key.includes("blue") ? "blue" : "red";
                                    const playerNumber = key.match(/\d+/)[0];
                                    return {
                                        label: value[2],
                                        value: `${teamColor}Player${playerNumber}`,
                                    };
                                })
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
                        const playerNumber = key.slice(-1);
                        const teamColor = key.includes("blue") ? "BLUE" : "RED";
                        playerMap.set(key, [`[PLAYER ${playerNumber} OPEN SPOT]`, `${teamColor} PLAYER ${playerNumber} ID`, "[EMPTY SPOT]"]);
                        refreshEmbed();
                    }
                }
            }

            // If the reaction emoji is either team1Emoji or team2Emoji, it checks for duplicate users in the blue and red teams.
            // It first gets the IDs of the players in the blue and red teams from the playerMap.
            // Then it iterates over the blue and red IDs. If a user is found in both teams, it removes their reactions and sets their playerMap entries to the default values.
            if (reaction.emoji.name === team1Emoji || reaction.emoji.name === team2Emoji) {
                const blueIDs = [playerMap.get("bluePlayer1")[1], playerMap.get("bluePlayer2")[1], playerMap.get("bluePlayer3")[1], playerMap.get("bluePlayer4")[1], playerMap.get("bluePlayer5")[1],];
                const redIDs = [playerMap.get("redPlayer1")[1], playerMap.get("redPlayer2")[1], playerMap.get("redPlayer3")[1], playerMap.get("redPlayer4")[1], playerMap.get("redPlayer5")[1],];

                for (var i = 0; i < blueIDs.length; i++) {
                    for (var j = 0; j < redIDs.length; j++) {
                        if (blueIDs[i] == redIDs[j]) {
                            removeUserReactions(blueIDs[i]);
                            setDefault(blueIDs[i]);
                        }
                    }
                }
            }
        });

        // This event is triggered when the collector stops collecting reactions.
        collector.on("end", (collected) => {
            console.log('\x1b[36m', '/mojito-aram:', '\x1b[31m', `Collected ${collected.size} total emoji reactions`, '\x1b[0m');
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
            const countDownFn = () => {
                const today = convertTZ(`${moment()}`, `${eventTimezone}`)
                const timeSpan = eventDayMoment.diff(today);
                if (timeSpan <= -today || timeSpan <= 0) {
                    clearInterval(interval);
                    if (timeSpan <= 0) {
                        startEvent();
                    } else {
                        collector.stop();
                    }
                    return;
                } else if (!eventDayMoment.isValid()) {
                    stopIntervalWithError();
                }
            };

            const startEvent = () => {
                collector.stop();
                eventChannel.createInvite()
                    .then(invite => message.reply({
                        content: `${eventPing} **${eventTitle}** has started!\nAll players will join ${invite}`
                    })).catch(handleError);

                messageContent = `${eventPing}`

                message.edit({ content: `${messageContent}` }).catch(handleError);

                delayEdit();
            };

            const stopIntervalWithError = () => {
                collector.stop();
                clearInterval(interval);
                interaction.followUp({
                    embeds: [embeds.formatEmbed],
                    ephemeral: true
                });
                message.delete().catch(handleError);
            };

            const handleError = (error) => {
                if (error.code !== 10008) {
                    console.error('Error:', error);
                }
            };

            const interval = setInterval(countDownFn, second);
        }

        intervals();

        // This function stops the reaction collector after a delay of 20 minutes. It uses the setTimeout function to schedule the collector.stop() call.
        async function delayEdit() {
            setTimeout(() => {
                collector.stop()
            }, 20 * 60 * 1000);
        }

        // This function refreshes the embed for the ARAM lobby message.
        // It creates a new embed with the event title, description, image, and footer.
        // It adds fields for the start time, voice channel, and the players in teams 1 and 2.
        // The players are retrieved from the playerMap.
        // The message is then edited to include the new embed and the original message content.
        // If there's an error during the edit (other than error code 10008, which means the message was already deleted), it stops the collector and logs the error.
        async function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#167301')
                .setTitle(`  ${eventTitle}  \n──────────────────────────────────────────`)
                .setDescription(`${aramEmoji}  **LEAGUE OF LEGENDS CUSTOM ARAM**  ${aramEmoji}`)
                .setImage(eventImage)
                .setFooter({ text: `This event was created by ${lobbyRunner}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                .addFields(
                    {
                        name: `⏰  **START TIME:** <t:${eventDayMomentUnix}:F>  ⏰`,
                        value: ` `
                    },
                    {
                        name: `🔊  **VOICE CHANNEL:** ${eventChannel}  🔊`,
                        value: ` `
                    },
                    {
                        name: ' ',
                        value: ` `,
                        inline: false,
                    },
                    {
                        name: `${preTeam1Emoji} ───── TEAM 1 ───── ${preTeam1Emoji}`,
                        value: `🔸 ${playerMap.get("bluePlayer1")[0]}\n🔸 ${playerMap.get("bluePlayer2")[0]}\n🔸 ${playerMap.get("bluePlayer3")[0]}\n🔸 ${playerMap.get("bluePlayer4")[0]}\n🔸 ${playerMap.get("bluePlayer5")[0]}`,
                        inline: true,
                    },
                    {
                        name: `${preTeam2Emoji} ───── TEAM 2 ───── ${preTeam2Emoji}`,
                        value: `🔸 ${playerMap.get("redPlayer1")[0]}\n🔸 ${playerMap.get("redPlayer2")[0]}\n🔸 ${playerMap.get("redPlayer3")[0]}\n🔸 ${playerMap.get("redPlayer4")[0]}\n🔸 ${playerMap.get("redPlayer5")[0]}`,
                        inline: true,
                    },
                );
            message.edit({ embeds: [customsEmbed], content: `${messageContent}`, }).catch(error => {
                collector.stop()
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    }
};