const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminChannel } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../../events/client/embeds.js')
const { hiddenLink } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-8-player")
        .setDescription("Replies with an embed for an 8 player event")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
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
                { name: '2022', value: 2022 },
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
                { name: 'TFT', value: 'https://i.imgur.com/OiNyojp.png' },
                { name: 'Custom ARAM', value: 'https://i.imgur.com/LPyzExv.png' },
                { name: 'Draft Normals', value: 'https://i.imgur.com/2wInBA3.png' },
                { name: 'St Pats Day Events & Gaming', value: 'https://i.imgur.com/br1woyw.png' },
                { name: 'Christmas Events & Gaming', value: 'https://i.imgur.com/seYI4bu.png' },
                { name: 'Halloween Events & Gaming', value: 'https://i.imgur.com/JBfz472.png' },
                { name: '420 Events & Gaming', value: 'https://i.imgur.com/SkXsZ4h.png' },
                { name: 'Valentines Day Events & Gaming', value: 'https://i.imgur.com/OIA69Um.png' },
                { name: '4th of July Events & Gaming', value: 'https://i.imgur.com/tEo7KGx.png' },
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
        const playerMap = new Map([
            ["bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]"]],
            ["bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]"]],
            ["bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]"]],
            ["bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]"]],
            ["bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]"]],
            ["bluePlayer6", ["[PLAYER 6 OPEN SPOT]", "BLUE PLAYER 6 ID", "[EMPTY SPOT]"]],
            ["bluePlayer7", ["[PLAYER 7 OPEN SPOT]", "BLUE PLAYER 7 ID", "[EMPTY SPOT]"]],
            ["bluePlayer8", ["[PLAYER 8 OPEN SPOT]", "BLUE PLAYER 8 ID", "[EMPTY SPOT]"]],
        ]);

        const eventPing = interaction.options.getMentionable("event-ping");

        const message = await interaction.reply({
            embeds: [embeds.customsEmbed2],
            content: `${eventPing}`,
            fetchReply: true,
        });

        const eventDescription = interaction.options.getString("event-description");
        const eventTitle = interaction.options.getString("event-title");
        const eventImage = interaction.options.getString("event-image");
        const prePlayerEmoji = interaction.options.getString("player-emoji");
        const eventChannel = interaction.options.getChannel("event-voice-channel");

        let playerEmoji;

        if (prePlayerEmoji.includes(':')) {
            playerEmoji = prePlayerEmoji.split(':')[1]
        } else {
            playerEmoji = prePlayerEmoji
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

        message.react(prePlayerEmoji).catch(error => {
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
                console.error('Error on player emoji:', error);
            }
        });
        message.react("❌").catch(error => { if (error.code !== 10008) { console.error('Error on X reaction:', error); } });

        const filter = (reaction, user) => {
            return reaction.emoji.name === playerEmoji || reaction.emoji.name === "❌" || reaction.emoji.name === "🔨";
        };

        const collector = message.createReactionCollector({ filter, });

        const buttonCollector = client.channels.cache.get(adminChannel).createMessageComponentCollector({ componentType: ComponentType.Button })

        collector.on("collect", async (reaction, user) => {
            const estDateLog = new Date()
            console.log(`Collected [${reaction.emoji.name}] from [${user.tag}] at [${convertTZ(estDateLog, 'EST').toLocaleString()}]`);
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

            if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer6").includes("[PLAYER 6 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer6", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer7").includes("[PLAYER 7 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer7", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            } else if (reaction.emoji.name === playerEmoji && playerMap.get("bluePlayer8").includes("[PLAYER 8 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
                playerMap.set("bluePlayer8", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
            }

            if (reaction.emoji.name === "❌" && usernameNoTag !== "Pub Bot") {
                setDefault(userNameID);
                removeUserReactions(userNameID);
            }

            refreshEmbed()

            const member = message.guild.members.cache.get(userNameID);
            if (reaction.emoji.name === "🔨" && usernameNoTag !== "Pub Bot") {
                message.reactions.cache.get("🔨").remove();
                if (member.permissions.has(PermissionFlagsBits.BanMembers)) {
                    const blueButtons1 = new ActionRowBuilder()
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
                    const blueButtons2 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('removebluePlayer6')
                                .setLabel(`${playerMap.get("bluePlayer6")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('removebluePlayer7')
                                .setLabel(`${playerMap.get("bluePlayer7")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('removebluePlayer8')
                                .setLabel(`${playerMap.get("bluePlayer8")[2]}`)
                                .setStyle(ButtonStyle.Primary),
                        );

                    const channel = client.channels.cache.get(adminChannel);
                    modMessage = await channel.send({
                        content: `<@${userNameID}> What player would you like to remove?\n`,
                        components: [blueButtons1, blueButtons2]
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

                            case 'removebluePlayer6':
                                removeUserReactions(playerMap.get("bluePlayer6")[1]);
                                setDefault(playerMap.get("bluePlayer6")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removebluePlayer6 button:', error); } });
                                break;

                            case 'removebluePlayer7':
                                removeUserReactions(playerMap.get("bluePlayer7")[1]);
                                setDefault(playerMap.get("bluePlayer7")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removebluePlayer7 button:', error); } });
                                break;

                            case 'removebluePlayer8':
                                removeUserReactions(playerMap.get("bluePlayer8")[1]);
                                setDefault(playerMap.get("bluePlayer8")[1]);
                                modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removebluePlayer8 button:', error); } });
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

                            case "bluePlayer6":
                                playerMap.set("bluePlayer6", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 6 ID", "[EMPTY SPOT]",]);
                                break;
                            case "bluePlayer7":
                                playerMap.set("bluePlayer7", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 7 ID", "[EMPTY SPOT]",]);
                                break;
                            case "bluePlayer8":
                                playerMap.set("bluePlayer8", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 8 ID", "[EMPTY SPOT]",]);
                                break;

                            default:
                                break;
                        }
                        refreshEmbed()
                    }
                }
            }
        });

        collector.on("end", (collected) => {
            console.log(`Collected ${collected.size} items`);
        });
        buttonCollector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
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
                    collector.stop()
                    buttonCollector.stop()

                    const eventEnd = message.reply({
                        content: `${eventPing} **${eventTitle}** has started! ${hiddenLink} https://discord.com/channels/${eventChannel.guild.id}/${eventChannel.id}`,
                    });

                    message.edit({ content: `${eventPing}` }).catch(error => {
                        collector.stop()
                        buttonCollector.stop()
                        clearInterval(interval)
                        if (error.code !== 10008) { console.error('Error on message edit:', error); }
                    });

                    return;
                } else {
                    if (eventDayMoment.isValid()) { }
                    else {
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

        function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#f9e512')
                .setTitle(eventTitle)
                .setDescription(`<t:${eventDayMomentUnix}:F>`)
                .setThumbnail('https://i.imgur.com/jDBV1eG.png')
                .setImage(eventImage)
                .setFooter({ text: `To be removed from this event list, react with ❌ to this event.` })
                .addFields(
                    {
                        name: `CLICK THE PLAYER EMOJI BELOW TO JOIN US`,
                        value: `${eventDescription}`,
                    },
                    {
                        name: `${prePlayerEmoji} PLAYERS ${prePlayerEmoji}`,
                        value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}`,
                        inline: true,
                    },
                    {
                        name: `‎`,
                        value: `${playerMap.get("bluePlayer5")[0]}\n${playerMap.get("bluePlayer6")[0]}\n${playerMap.get("bluePlayer7")[0]}\n${playerMap.get("bluePlayer8")[0]}`,
                        inline: true,
                    },
                    {
                        name: 'VOICE CHANNEL',
                        value: `This event will be held in ${eventChannel}`
                    }
                );

            message.edit({ embeds: [customsEmbed], content: `${eventPing} this event will start <t:${eventDayMomentUnix}:R>`, }).catch(error => {
                collector.stop()
                buttonCollector.stop()
                clearInterval(interval)
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    },
}