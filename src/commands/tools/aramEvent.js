const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminChannel } = process.env;
const { verifiedRole } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");
const { clearInterval } = require("timers");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../../events/client/embeds.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-aram")
        .setDescription("Replies with an embed for a custom ARAM event")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
        .addStringOption((option) => option
            .setName("event-title")
            .setDescription("title of the event")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("event-description")
            .setDescription("description of the event")
            .setRequired(true)
        )
        .addMentionableOption((option) => option
            .setName("event-ping")
            .setDescription("what role you would like to ping for the event")
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
        .addIntegerOption((option) => option
            .setName("event-year")
            .setDescription("year of the event")
            .setRequired(true)
            .addChoices(
                { name: '2023', value: 2023 },
            )
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
                { name: 'Eastern Standard Time (EST)', value: 'EST' },
                { name: 'Pacific Standard Time (PST)', value: 'PST8PDT' },
                { name: 'Mountain Standard Time (MST)', value: 'MST' },
                { name: 'Central Standard Time (CST)', value: 'CST6CDT' },
            )
        )
        .addStringOption((option) => option
            .setName("event-image")
            .setDescription("image that will be associated with the event")
            .setRequired(true)
            .addChoices(
                { name: 'Custom ARAM', value: 'https://i.imgur.com/LPyzExv.png' },
                { name: 'St Pats Day Events & Gaming', value: 'https://i.imgur.com/br1woyw.png' },
                { name: 'Christmas Events & Gaming', value: 'https://i.imgur.com/seYI4bu.png' },
                { name: 'Halloween Events & Gaming', value: 'https://i.imgur.com/JBfz472.png' },
                { name: '420 Events & Gaming', value: 'https://i.imgur.com/SkXsZ4h.png' },
                { name: 'Valentines Day Events & Gaming', value: 'https://i.imgur.com/OIA69Um.png' },
                { name: '4th of July Events & Gaming', value: 'https://i.imgur.com/tEo7KGx.png' },
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
        console.log('\x1b[36m', '/pub-aram has been kicked off', '\x1b[0m')
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
        const eventPing = interaction.options.getMentionable("event-ping");

        const message = await interaction.reply({
            embeds: [embeds.customsEmbed],
            content: `${eventPing}`,
            fetchReply: true,
        });

        eventChannel.permissionOverwrites.edit(verifiedRole, { Connect: true });
        // eventChannel.permissionOverwrites.edit(message.guild.roles.everyone.id, { Connect: true });

        const eventDescription = interaction.options.getString("event-description");
        const eventTitle = interaction.options.getString("event-title").toUpperCase();
        const eventImage = interaction.options.getString("event-image");
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
        let eventYear = interaction.options.getInteger("event-year").toString();
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

        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
        }

        const eventDayMomentUnix = momentTZ.tz(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`, `${eventTimezone}`).unix()

        let messageContent = `${eventPing} this event will start <t:${eventDayMomentUnix}:R>`

        message.react(preTeam1Emoji).catch(error => {
            if (error.code == 10014) {
                collector.stop()
                buttonCollector.stop()
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
                buttonCollector.stop()
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
            return reaction.emoji.name === team1Emoji || reaction.emoji.name === team2Emoji || reaction.emoji.name === "❌" || reaction.emoji.name === "🔨";
        };

        const collector = message.createReactionCollector({ filter, });

        const buttonCollector = client.channels.cache.get(adminChannel).createMessageComponentCollector({ componentType: ComponentType.Button })

        collector.on("collect", async (reaction, user) => {
            const estDateLog = new Date()
            console.log('\x1b[36m', '/pub-aram:', '\x1b[32m', `Collected [${reaction.emoji.name}] from [${user.tag}] at [${convertTZ(estDateLog, 'EST').toLocaleString()}]`, '\x1b[0m');
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
            if (reaction.emoji.name === "🔨" && usernameNoTag !== "Mojito") {
                message.reactions.cache.get("🔨").remove();
                if (member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                    const blueButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('removeBluePlayer1')
                                .setLabel(`${playerMap.get("bluePlayer1")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('removeBluePlayer2')
                                .setLabel(`${playerMap.get("bluePlayer2")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('removeBluePlayer3')
                                .setLabel(`${playerMap.get("bluePlayer3")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('removeBluePlayer4')
                                .setLabel(`${playerMap.get("bluePlayer4")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('removeBluePlayer5')
                                .setLabel(`${playerMap.get("bluePlayer5")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                        );
                    const redButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('removeRedPlayer1')
                                .setLabel(`${playerMap.get("redPlayer1")[2]}`)
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId('removeRedPlayer2')
                                .setLabel(`${playerMap.get("redPlayer2")[2]}`)
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId('removeRedPlayer3')
                                .setLabel(`${playerMap.get("redPlayer3")[2]}`)
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId('removeRedPlayer4')
                                .setLabel(`${playerMap.get("redPlayer4")[2]}`)
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId('removeRedPlayer5')
                                .setLabel(`${playerMap.get("redPlayer5")[2]}`)
                                .setStyle(ButtonStyle.Danger),
                        );

                    const channel = client.channels.cache.get(adminChannel);
                    modMessage = await channel.send({
                        content: `<@${userNameID}> What player would you like to remove?\n`,
                        components: [blueButtons, redButtons]
                    });

                    await buttonCollector.on('collect', i => {
                        switch (i.customId) {
                            case 'removeBluePlayer1':
                                removeUserReactions(playerMap.get("bluePlayer1")[1]);
                                setDefault(playerMap.get("bluePlayer1")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer1 button:', error); } });
                                break;

                            case 'removeBluePlayer2':
                                removeUserReactions(playerMap.get("bluePlayer2")[1]);
                                setDefault(playerMap.get("bluePlayer2")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer2 button:', error); } });
                                break;

                            case 'removeBluePlayer3':
                                removeUserReactions(playerMap.get("bluePlayer3")[1]);
                                setDefault(playerMap.get("bluePlayer3")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer3 button:', error); } });
                                break;

                            case 'removeBluePlayer4':
                                removeUserReactions(playerMap.get("bluePlayer4")[1]);
                                setDefault(playerMap.get("bluePlayer4")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer4 button:', error); } });
                                break;

                            case 'removeBluePlayer5':
                                removeUserReactions(playerMap.get("bluePlayer5")[1]);
                                setDefault(playerMap.get("bluePlayer5")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer5 button:', error); } });
                                break;

                            case 'removeRedPlayer1':
                                removeUserReactions(playerMap.get("redPlayer1")[1]);
                                setDefault(playerMap.get("redPlayer1")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer1 button:', error); } });
                                break;

                            case 'removeRedPlayer2':
                                removeUserReactions(playerMap.get("redPlayer2")[1]);
                                setDefault(playerMap.get("redPlayer2")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer2 button:', error); } });
                                break;

                            case 'removeRedPlayer3':
                                removeUserReactions(playerMap.get("redPlayer3")[1]);
                                setDefault(playerMap.get("redPlayer3")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer3 button:', error); } });
                                break;

                            case 'removeRedPlayer4':
                                removeUserReactions(playerMap.get("redPlayer4")[1]);
                                setDefault(playerMap.get("redPlayer4")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer4 button:', error); } });
                                break;

                            case 'removeRedPlayer5':
                                removeUserReactions(playerMap.get("redPlayer5")[1]);
                                setDefault(playerMap.get("redPlayer5")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer5 button:', error); } });
                                break;

                            default:
                                break;
                        }
                    });
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
                                playerMap.set("bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]",]);
                                break;
                            case "bluePlayer2":
                                playerMap.set("bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]",]);
                                break;
                            case "bluePlayer3":
                                playerMap.set("bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]",]);
                                break;
                            case "bluePlayer4":
                                playerMap.set("bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]",]);
                                break;
                            case "bluePlayer5":
                                playerMap.set("bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]",]);
                                break;

                            case "redPlayer1":
                                playerMap.set("redPlayer1", ["[PLAYER 1 OPEN SPOT]", "RED PLAYER 1 ID", "[EMPTY SPOT]",]);
                                break;
                            case "redPlayer2":
                                playerMap.set("redPlayer2", ["[PLAYER 2 OPEN SPOT]", "RED PLAYER 2 ID", "[EMPTY SPOT]",]);
                                break;
                            case "redPlayer3":
                                playerMap.set("redPlayer3", ["[PLAYER 3 OPEN SPOT]", "RED PLAYER 3 ID", "[EMPTY SPOT]",]);
                                break;
                            case "redPlayer4":
                                playerMap.set("redPlayer4", ["[PLAYER 4 OPEN SPOT]", "RED PLAYER 4 ID", "[EMPTY SPOT]",]);
                                break;
                            case "redPlayer5":
                                playerMap.set("redPlayer5", ["[PLAYER 5 OPEN SPOT]", "RED PLAYER 5 ID", "[EMPTY SPOT]",]);
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
            console.log('\x1b[36m', '/pub-aram:', '\x1b[31m', `Collected ${collected.size} total emoji reactions`, '\x1b[0m');
        });
        buttonCollector.on('end', collected => {
            console.log('\x1b[36m', '/pub-aram:', '\x1b[31m', `Collected ${collected.size} total button reactions`, '\x1b[0m');
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
                    buttonCollector.stop()
                    return;
                } else if (timeSpan <= 0) {
                    clearInterval(interval);
                    eventChannel.createInvite()
                        .then(invite => message.reply({
                            content: `${eventPing} **${eventTitle}** has started!\n${preTeam1Emoji} **BOTH TEAMS** ${preTeam2Emoji} will join: ${invite}`
                        })).catch(error => { if (error.code !== 10008) { console.error('Error on replying to message', error); } });

                    messageContent = `${eventPing}`

                    message.edit({ content: `${messageContent}` }).catch(error => {
                        collector.stop()
                        buttonCollector.stop()
                        clearInterval(interval)
                        if (error.code !== 10008) { console.error('Error on message edit:', error); }
                    });

                    delayEdit()

                    return;

                } else {
                    if (eventDayMoment.isValid()) { } else {
                        collector.stop()
                        buttonCollector.stop()
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
                buttonCollector.stop()
            }, 20 * 60 * 1000);
        }

        async function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#167301')
                .setTitle(eventTitle)
                .setDescription(`<t:${eventDayMomentUnix}:F>`)
                .setThumbnail('https://i.imgur.com/6ZfWcjq.png')
                .setImage(eventImage)
                .setFooter({ text: `To be removed from a team or change teams, react with ❌ to this event.` })
                .addFields(
                    {
                        name: "CLICK A TEAM EMOJI BELOW TO JOIN A TEAM",
                        value: `${eventDescription}`,
                    },
                    {
                        name: `${preTeam1Emoji} TEAM 1 ${preTeam1Emoji}`,
                        value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[0]}`,
                        inline: true,
                    },
                    {
                        name: `${preTeam2Emoji} TEAM 2 ${preTeam2Emoji}`,
                        value: `${playerMap.get("redPlayer1")[0]}\n${playerMap.get("redPlayer2")[0]}\n${playerMap.get("redPlayer3")[0]}\n${playerMap.get("redPlayer4")[0]}\n${playerMap.get("redPlayer5")[0]}`,
                        inline: true,
                    },
                    {
                        name: 'VOICE CHANNEL',
                        value: `This event will be held in ${eventChannel}`
                    }
                );
            message.edit({ embeds: [customsEmbed], content: `${messageContent}`, }).catch(error => {
                collector.stop()
                buttonCollector.stop()
                clearInterval(interval)
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    }
};