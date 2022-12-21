const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminChannel } = process.env;
const moment = require("moment");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../../events/client/embeds.js')

let interval;
let eventMonth;
let eventDay;
let eventYear;
let timeStandard;
let zeroTimeStamp;

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
        .addStringOption((option) => option
            .setName("event-ping")
            .setDescription("what role you would like to ping for the event")
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName("event-month")
            .setDescription("month of the event - MUST BE IN ISO FORMAT - EXAMPLE: 11 or 06")
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName("event-day")
            .setDescription("day of the event - MUST BE IN ISO FORMAT - EXAMPLE: 29 or 07")
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName("event-year")
            .setDescription("year of the event - MUST BE IN ISO FORMAT - EXAMPLE: 2022")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("event-time")
            .setDescription("time of the event - MUST BE IN ISO FORMAT - EXAMPLE: 08:30 PM or 11:05 AM")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("event-image")
            .setDescription("imgur link of the image")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("player-emoji")
            .setDescription("emoji that will be associated with the player reaction")
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

        const eventPing = interaction.options.getString("event-ping");

        const message = await interaction.reply({
            embeds: [embeds.customsEmbed2],
            content: eventPing,
            fetchReply: true,
        });

        if (zeroTimeStamp == undefined || zeroTimeStamp == '0, 0, 0, 0') {
            const eventDescription = interaction.options.getString("event-description");
            const eventTitle = interaction.options.getString("event-title");
            const eventImage = interaction.options.getString("event-image");
            const prePlayerEmoji = interaction.options.getString("player-emoji");

            let playerEmoji;

            if (prePlayerEmoji.includes(':')) {
                playerEmoji = prePlayerEmoji.split(':')[1]
            } else {
                playerEmoji = prePlayerEmoji
            }

            eventMonth = interaction.options.getInteger("event-month").toString();
            eventDay = interaction.options.getInteger("event-day").toString();
            eventYear = interaction.options.getInteger("event-year").toString();
            timeStandard = interaction.options.getString("event-time");

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

            message.react(prePlayerEmoji).catch(error => {
                if (error.code == 10014) {
                    collector.stop()
                    buttonCollector.stop()
                    clearInterval(interval)
                    zeroTimeStamp = '0, 0, 0, 0'
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
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
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
                    if (member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
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
                            );
                        const blueButtons2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('removeBluePlayer5')
                                    .setLabel(`${playerMap.get("bluePlayer5")[2]}`)
                                    .setStyle(ButtonStyle.Primary),
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
                            content: `<@${userNameID}> Which player would you like to remove from **${eventTitle}**?\n`,
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

            const countDownFn = () => {
                const today = moment();
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
                    refreshCounter('0', '0', '0', '0')
                    interaction.followUp({
                        content: `${eventPing} **${eventTitle}** has started!`
                    })
                    return;
                } else {
                    const days = Math.floor(timeSpan / day);
                    const hours = Math.floor((timeSpan % day) / hour);
                    const minutes = Math.floor((timeSpan % hour) / minute);
                    const seconds = Math.floor((timeSpan % minute) / second);

                    if (eventDayMoment.isValid()) {
                        refreshCounter(days, hours, minutes)
                    } else {
                        collector.stop()
                        buttonCollector.stop()
                        clearInterval(interval)
                        zeroTimeStamp = '0, 0, 0, 0'

                        interaction.followUp({
                            embeds: [embeds.formatEmbed],
                            ephemeral: true
                        })
                        message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with incorrect format', error); } });
                    }
                }
            };

            interval = setInterval(countDownFn, 5000);

            const customsEmbed = new EmbedBuilder()
                .setColor('#AB561C')
                .setTitle(eventTitle)
                .setDescription(`${timeStandard} EST on ${eventMonth}/${eventDay}/${eventYear}`)
                .setFooter({ text: `To be removed from this event list, react with ❌ to this message.\nThis event will start in 0 days, 0 hours, and 0 minutes.` })
                .setThumbnail(eventImage)
                .addFields(
                    {
                        name: `CLICK THE PLAYER EMOJI BELOW TO JOIN THE EVENT`,
                        value: `${eventDescription}`,
                    },
                    {
                        name: `${prePlayerEmoji} PLAYERS ${prePlayerEmoji}`,
                        value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[0]}\n${playerMap.get("bluePlayer6")[0]}\n${playerMap.get("bluePlayer7")[0]}\n${playerMap.get("bluePlayer8")[0]}`,
                        inline: true,
                    },
                );

            function refreshEmbed() {
                message.edit({
                    embeds: [customsEmbed.setFields(
                        {
                            name: `CLICK THE PLAYER EMOJI BELOW TO JOIN THE EVENT`,
                            value: `${eventDescription}`,
                        },
                        {
                            name: `${prePlayerEmoji} PLAYERS ${prePlayerEmoji}`,
                            value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[0]}\n${playerMap.get("bluePlayer6")[0]}\n${playerMap.get("bluePlayer7")[0]}\n${playerMap.get("bluePlayer8")[0]}`, inline: true,
                        })],
                    content: `${eventPing}`,
                }).catch(error => {
                    collector.stop()
                    buttonCollector.stop()
                    clearInterval(interval)
                    zeroTimeStamp = '0, 0, 0, 0'
                    if (error.code !== 10008) { console.error('Error on message edit:', error); }
                });
            }

            function refreshCounter(days, hours, minutes) {
                zeroTimeStamp = `${days}, ${hours}, ${minutes}, 0`;
                message.edit({ embeds: [customsEmbed.setFooter({ text: `To be removed from this event list, react with ❌ to this message.\nThis event will start in ${days} days, ${hours} hours, and ${minutes} minutes` })] }).catch(error => {
                    collector.stop()
                    buttonCollector.stop()
                    clearInterval(interval)
                    zeroTimeStamp = '0, 0, 0, 0'
                    if (error.code !== 10008) { console.error('Error on message edit:', error); }
                });
            }
        } else {
            interaction.followUp({
                content: `There is already an iteration of this event currently happening. You must wait until the current event is over to use this command again. You may use this command again on **${eventMonth}/${eventDay}/${eventYear}** at **${timeStandard}**.`,
                ephemeral: true
            })
            message.delete();
        }
    },
}

