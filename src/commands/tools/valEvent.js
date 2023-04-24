const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminChannel } = process.env;
const { leagueChatChannel } = process.env;
const { mojitoValChannel } = process.env;
const { valorantEmoji } = process.env;
const { verifiedRole } = process.env;
const { leagueRole } = process.env;
const { unratedRole } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");
const { clearInterval } = require("timers");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../../events/client/embeds.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-val")
        .setDescription("Replies with an embed for a custom Unrated event")
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
            .setName("event-map")
            .setDescription("map that the event will take place in")
            .setRequired(true)
            .addChoices(
                { name: 'Ascent', value: 'https://i.imgur.com/4BdGlCw.png' },
                { name: 'Bind', value: 'https://i.imgur.com/YnCLnAZ.png' },
                { name: 'Breeze', value: 'https://i.imgur.com/DXdUOod.png' },
                { name: 'Fracture', value: 'https://i.imgur.com/QZiZ6du.png' },
                { name: 'Haven', value: 'https://i.imgur.com/Kzfylb2.png' },
                { name: 'Icebox', value: 'https://i.imgur.com/GHeJ690.png' },
                { name: 'Lotus', value: 'https://i.imgur.com/thX8KvI.png' },
                { name: 'Pearl', value: 'https://i.imgur.com/vrKjP4h.png' },
                { name: 'Split', value: 'https://i.imgur.com/bWKm1XO.png' },
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
            .setName("team-1-voice-channel")
            .setDescription("voice channel that team 1 will be held")
            .setRequired(true)
        )
        .addChannelOption((option) => option
            .setName("team-2-voice-channel")
            .setDescription("voice channel that team 2 will be held")
            .setRequired(true)
        )
        .addChannelOption((option) => option
            .setName("waiting-lobby-voice-channel")
            .setDescription("waiting lobby that team 1 and 2 will use")
            .setRequired(true)
        ),

    async execute(interaction, client) {
        let estDateLog = new Date()
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
        }

        console.log('\x1b[36m', `/pub-val has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')

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

        const team1Channel = interaction.options.getChannel("team-1-voice-channel");
        const team2Channel = interaction.options.getChannel("team-2-voice-channel");
        const waitingLobbyChannel = interaction.options.getChannel("waiting-lobby-voice-channel");
        const eventPing = `<@&${unratedRole}>`
        let lobbyRunner = interaction.user.username

        if(interaction.member.nickname !== null) {
            lobbyRunner = interaction.member.nickname
        }

        let channelComannd = client.channels.cache.get(interaction.channelId);

        const modInfoEmbed = new EmbedBuilder()
            .setColor('#167301')
            .addFields(
                {
                    name: `🔨  REMOVING A PLAYER MANUALLY  🔨`,
                    value: `You can react with the hammer emoji to remove a player manually if needed. Only moderators have permissions to perform this action.\n‎`,
                },
                {
                    name: `📌  REMINDER PING AND INFO MESSAGE  📌`,
                    value: `You can react with the pushpin emoji to send a reminder message in league-chat. Moderators and Bar Nuts have permissions to perform this action.`,
                },
            )

        const replyMessage = await interaction.reply({
            embeds: [modInfoEmbed],
            ephemeral: true
        });

        const message = await channelComannd.send({
            content: `${eventPing}`,
            embeds: [embeds.customsEmbed],
            fetchReply: true,
        });

        team1Channel.setUserLimit(6).then(() => team1Channel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }));
        team2Channel.setUserLimit(6).then(() => team2Channel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }));
        waitingLobbyChannel.setUserLimit(12).then(() => waitingLobbyChannel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }));

        const eventTitle = interaction.options.getString("event-title").toUpperCase();
        const eventMap = interaction.options.getString("event-map");
        const preTeam1Emoji = interaction.options.getString("team-1-emoji");
        const preTeam2Emoji = interaction.options.getString("team-2-emoji");

        let team1Emoji;
        let team2Emoji

        if (preTeam1Emoji.includes(':')) {
            team1Emoji = preTeam1Emoji.split(':')[1]
        } else {
            team1Emoji = preTeam1Emoji
        }

        if (preTeam2Emoji.includes(':')) {
            team2Emoji = preTeam2Emoji.split(':')[1]
        } else {
            team2Emoji = preTeam2Emoji
        }

        let eventMonth = interaction.options.getInteger("event-month").toString();
        let eventDay = interaction.options.getInteger("event-day").toString();
        let eventYear = "2023"
        let eventAmPm = interaction.options.getString("event-am-pm").toString();
        let eventMinute = interaction.options.getString("event-minute").toString();
        let eventHour = interaction.options.getString("event-hour");
        let eventTimezone = interaction.options.getString("event-timezone");

        if (eventDay.toString().length == 1) {
            const zeroPad = (num, places) => String(num).padStart(places, '0')
            eventDay = zeroPad(eventDay, 2)
        }

        if (eventMonth.toString().length == 1) {
            const zeroPad = (num, places) => String(num).padStart(places, '0')
            eventMonth = zeroPad(eventMonth, 2)
        }

        let timeStandard = `${eventHour}:${eventMinute} ${eventAmPm}`

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

        let messageContent = `${eventPing} this custom Unrated lobby will start <t:${eventDayMomentUnix}:R>`

        message.react(preTeam1Emoji).catch(error => {
            if (error.code == 10014) {
                collector.stop()
                interaction.followUp({
                    embeds: [embeds.emojiEmbed],
                    ephemeral: true
                })
                message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with unknown emoji', error); } });
            }
            if (error.code !== 10008) {
                console.error('Error on team 1 emoji:', error);
            }
        });
        message.react(preTeam2Emoji).catch(error => {
            if (error.code == 10014) {
                collector.stop()
                interaction.followUp({
                    embeds: [embeds.emojiEmbed],
                    ephemeral: true
                })
                message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with unknown emoji', error); } });
            }
            if (error.code !== 10008) {
                console.error('Error on team 2 emoji:', error);
            }
        });
        message.react("❌").catch(error => { if (error.code !== 10008) { console.error('Error on X reaction:', error); } });

        const filter = (reaction, user) => {
            return reaction.emoji.name === team1Emoji || reaction.emoji.name === team2Emoji || reaction.emoji.name === "❌" || reaction.emoji.name === "🔨" || reaction.emoji.name === "📌";
        };

        const collector = message.createReactionCollector({ filter, dispose: true });

        collector.on("collect", async (reaction, user) => {
            estDateLog = new Date()
            console.log('\x1b[36m', '/pub-val:', '\x1b[32m', `Collected [${reaction.emoji.name}] from [${user.tag}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m');
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

            if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            }

            if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("redPlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("redPlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("redPlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("redPlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Mojito" && !valuesArray.includes(true)) {
                playerMap.set("redPlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
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
                    let countOfEmpty = 0;
                    for (let value of playerMap.values()) {
                        if ([value[2]].includes('[EMPTY SPOT]')) {
                            countOfEmpty++;
                        }
                    }
                    if (countOfEmpty > 0) {
                        const channel = client.channels.cache.get(leagueChatChannel);
                        if (countOfEmpty == 1) {
                            let reminder = await channel.send({
                                content: `${eventPing} There is **${countOfEmpty}** spot open in the Custom Unrated lobby! Go to <#${mojitoValChannel}> to sign up! ${valorantEmoji}`,
                            })
                        } else {
                            let reminder = await channel.send({
                                content: `${eventPing} There are **${countOfEmpty}** spots open in the Custom Unrated lobby! Go to <#${mojitoValChannel}> to sign up! ${valorantEmoji}`,
                            })
                        }
                    }
                }
            }

            if (reaction.emoji.name === "🔨" && usernameNoTag !== "Mojito") {
                message.reactions.cache.get("🔨").remove();
                if (member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                    const channel = client.channels.cache.get(adminChannel);

                    const modMessageEmbed = new EmbedBuilder()
                        .setColor('#167301')
                        .setTitle(eventTitle)
                        .setDescription(`<t:${eventDayMomentUnix}:F>`)
                        .setThumbnail('https://i.imgur.com/LFGs4Fp.png')
                        .addFields(
                            {
                                name: "PLAYER REMOVAL",
                                value: `React to this message with the corresponding player emoji to remove them from the event list`,
                            },
                            {
                                name: `TEAM 1`,
                                value: `1️⃣ ${playerMap.get("bluePlayer1")[0]}\n2️⃣ ${playerMap.get("bluePlayer2")[0]}\n3️⃣ ${playerMap.get("bluePlayer3")[0]}\n4️⃣ ${playerMap.get("bluePlayer4")[0]}\n5️⃣ ${playerMap.get("bluePlayer5")[0]}`,
                                inline: true,
                            },
                            {
                                name: `TEAM 2`,
                                value: `6️⃣ ${playerMap.get("redPlayer1")[0]}\n7️⃣ ${playerMap.get("redPlayer2")[0]}\n8️⃣ ${playerMap.get("redPlayer3")[0]}\n9️⃣ ${playerMap.get("redPlayer4")[0]}\n🔟 ${playerMap.get("redPlayer5")[0]}`,
                                inline: true,
                            },
                        );

                    let modMessage = await channel.send({
                        content: `<@${userNameID}> What player would you like to remove?\n`,
                        embeds: [modMessageEmbed]
                    })

                    const modFilter = (reaction, user) => {
                        return reaction.emoji.name === "1️⃣" || reaction.emoji.name === "2️⃣" || reaction.emoji.name === "3️⃣" || reaction.emoji.name === "4️⃣" || reaction.emoji.name === "5️⃣" || reaction.emoji.name === "6️⃣" || reaction.emoji.name === "7️⃣" || reaction.emoji.name === "8️⃣" || reaction.emoji.name === "9️⃣" || reaction.emoji.name === "🔟";
                    };

                    const modMessageCollector = modMessage.createReactionCollector({ modFilter, dispose: true });

                    modMessageCollector.on("collect", async (reaction, user) => {
                        const fullUserName = user.tag.toString();
                        const userNameID = user.id.toString();
                        usernameNoTag = fullUserName.substring(0, fullUserName.length - 5);

                        if (reaction.emoji.name === "1️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("bluePlayer1")[1]);
                            setDefault(playerMap.get("bluePlayer1")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "2️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("bluePlayer2")[1]);
                            setDefault(playerMap.get("bluePlayer2")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "3️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("bluePlayer3")[1]);
                            setDefault(playerMap.get("bluePlayer3")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "4️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("bluePlayer4")[1]);
                            setDefault(playerMap.get("bluePlayer4")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "5️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("bluePlayer5")[1]);
                            setDefault(playerMap.get("bluePlayer5")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "6️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("redPlayer1")[1]);
                            setDefault(playerMap.get("redPlayer1")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "7️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("redPlayer2")[1]);
                            setDefault(playerMap.get("redPlayer2")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "8️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("redPlayer3")[1]);
                            setDefault(playerMap.get("redPlayer3")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "9️⃣" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("redPlayer4")[1]);
                            setDefault(playerMap.get("redPlayer4")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                        if (reaction.emoji.name === "🔟" && usernameNoTag !== "Mojito") {
                            removeUserReactions(playerMap.get("redPlayer5")[1]);
                            setDefault(playerMap.get("redPlayer5")[1]);
                            reaction.users.remove(user).then(() => modMessageCollector.stop())
                        }
                    })
                    modMessageCollector.on("end", (collected) => {
                        console.log('\x1b[36m', '/pub-val:', '\x1b[32m', `Collected [number emoji] from [${user.tag}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}] to remove a player`, '\x1b[0m');
                        modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on mod message removal', error); } });
                    })
                }
            }

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

            async function setDefault(user) {
                for (const [key, value] of playerMap) {
                    if (value.includes(user)) {
                        switch (key) {
                            case "bluePlayer1":
                                playerMap.set("bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT],"]);
                                break;
                            case "bluePlayer2":
                                playerMap.set("bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]"]);
                                break;
                            case "bluePlayer3":
                                playerMap.set("bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]"]);
                                break;
                            case "bluePlayer4":
                                playerMap.set("bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]"]);
                                break;
                            case "bluePlayer5":
                                playerMap.set("bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]"]);
                                break;

                            case "redPlayer1":
                                playerMap.set("redPlayer1", ["[PLAYER 1 OPEN SPOT]", "RED PLAYER 1 ID", "[EMPTY SPOT]"]);
                                break;
                            case "redPlayer2":
                                playerMap.set("redPlayer2", ["[PLAYER 2 OPEN SPOT]", "RED PLAYER 2 ID", "[EMPTY SPOT]"]);
                                break;
                            case "redPlayer3":
                                playerMap.set("redPlayer3", ["[PLAYER 3 OPEN SPOT]", "RED PLAYER 3 ID", "[EMPTY SPOT]"]);
                                break;
                            case "redPlayer4":
                                playerMap.set("redPlayer4", ["[PLAYER 4 OPEN SPOT]", "RED PLAYER 4 ID", "[EMPTY SPOT]"]);
                                break;
                            case "redPlayer5":
                                playerMap.set("redPlayer5", ["[PLAYER 5 OPEN SPOT]", "RED PLAYER 5 ID", "[EMPTY SPOT]"]);
                                break;

                            default:
                                break;
                        }
                        refreshEmbed()
                    }
                }
            }

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

        collector.on("end", (collected) => {
            console.log('\x1b[36m', '/pub-val:', '\x1b[31m', `Collected ${collected.size} total emoji reactions`, '\x1b[0m');
        });

        const eventDayMoment = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`);

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        async function intervals() {
            let interval;
            const countDownFn = () => {
                const today = convertTZ(`${moment()}`, `${eventTimezone}`)
                const timeSpan = eventDayMoment.diff(today);
                if (timeSpan <= -today) {
                    clearInterval(interval);
                    collector.stop()
                    return;
                } else if (timeSpan <= 0) {
                    clearInterval(interval);
                    team1Channel.createInvite()
                        .then(invite1 => team2Channel.createInvite().then(invite2 => message.reply({
                            content: `${eventPing} **${eventTitle}** has started!\n${preTeam1Emoji} **TEAM 1** ${preTeam1Emoji} will join: ${invite1}\n${preTeam2Emoji} **TEAM 2** ${preTeam2Emoji} will join: ${invite2}`
                        }))).catch(error => { if (error.code !== 10008) { console.error('Error on replying to message', error); } });

                    messageContent = `${eventPing}`

                    message.edit({ content: `${messageContent}` }).catch(error => {
                        collector.stop()
                        clearInterval(interval)
                        if (error.code !== 10008) { console.error('Error on message edit:', error); }
                    });

                    delayEdit()

                    return;

                } else {
                    if (eventDayMoment.isValid()) { } else {
                        collector.stop()
                        clearInterval(interval)
                        interaction.followUp({
                            embeds: [embeds.formatEmbed],
                            ephemeral: true
                        })
                        message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with incorrect format', error); } });
                    }
                }
            };
            interval = setInterval(countDownFn, second);
        }

        intervals()

        async function delayEdit() {
            setTimeout(() => {
                collector.stop()
            }, 20 * 60 * 1000);
        }

        async function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#167301')
                .setTitle(`★  ${eventTitle}  ★\n──────────────────────────────────────────`)
                .setDescription(`${valorantEmoji}  **VALORANT CUSTOM UNRATED**  ${valorantEmoji}`)
                .setImage(eventMap)
                .setFooter({ text: `This Custom Unrated Lobby has been created by ${lobbyRunner}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                .addFields(
                    {
                        name: `⏰  **START TIME:** <t:${eventDayMomentUnix}:F>  ⏰`,
                        value: ` `,
                    },
                    {
                        name: `🔊  **WAITING LOBBY:** ${waitingLobbyChannel}  🔊`,
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
                    {
                        name: ' ',
                        value: ` `,
                        inline: false,
                    },
                    {
                        name: `${preTeam1Emoji} ─── TEAM 1 VOICE ── ${preTeam1Emoji}`,
                        value: `TEAM 1: ${team1Channel}`,
                        inline: true,
                    },
                    {
                        name: `${preTeam2Emoji} ─── TEAM 2 VOICE ── ${preTeam2Emoji}`,
                        value: `TEAM 2: ${team2Channel}`,
                        inline: true,
                    }
                );
            message.edit({ embeds: [customsEmbed], content: `${messageContent}`, }).catch(error => {
                collector.stop()
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    }
};