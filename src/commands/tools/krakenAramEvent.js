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
const embeds = require('../../events/client/embeds.js')
const { logChannel } = process.env;
const { pinkDiamondEmoji } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kraken-aram")
        .setDescription("Command for creating a Custom ARAM event")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption((option) => option
            .setName("event-title")
            .setDescription("title of the event")
            .setRequired(true)
            .setMaxLength(32)
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
            .setMinValue(1)
            .setMaxValue(31)
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
        // .addStringOption((option) => option
        //     .setName("event-image")
        //     .setDescription("image that will be associated with the event")
        //     .setRequired(true)
        //     .addChoices(
        //         { name: 'Custom ARAM (still image)', value: 'https://i.imgur.com/JXd3vFV.png' },
        //         { name: 'Custom ARAM (animated gif)', value: 'https://media1.tenor.com/images/eb0d426a21704bc561d8c5822f4eacfd/tenor.gif?itemid=27606843' },
        //         { name: 'Saint Patricks Day', value: 'https://i.imgur.com/YYtOFvP.png' },
        //         { name: 'Christmas', value: 'https://i.imgur.com/J7EtAdM.png' },
        //         { name: 'Halloween', value: 'https://i.imgur.com/gpmSHOc.png' },
        //         { name: '420', value: 'https://i.imgur.com/VmSOrtY.png' },
        //         { name: 'Valentines Day', value: 'https://i.imgur.com/4PPf7Wf.png' },
        //         { name: '4th of July', value: 'https://i.imgur.com/UimNKTW.png' },
        //     )
        // )
        .addChannelOption((option) => option
            .setName("event-voice-channel")
            .setDescription("voice channel that the event will take place in")
            .setRequired(true)
            .addChannelTypes(2)
        ),

    async execute(interaction, client) {
        let estDateLog = new Date()
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
        }

        console.log('\x1b[36m', `/kraken-aram has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')

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

        // For testing purposes, you can use the following playerMap to fill the teams with test users.
        // const playerMap = new Map([
        //     ["bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]"]],
        //     ["bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]"]],
        //     ["bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]"]],
        //     ["bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]"]],
        //     ["bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]"]],
        //     ["redPlayer1", ["<@238519076769628171>", "238519076769628171", "pulldaleverkronk"]],
        //     ["redPlayer2", ["<@1057759930192510976>", "1057759930192510976", "gooby5905"]],
        //     ["redPlayer3", ["<@456695289500270593>", "456695289500270593", "cootch"]],
        //     ["redPlayer4", ["<@1070755820528218182>", "1070755820528218182", "ratman00570"]],
        //     ["redPlayer5", ["[PLAYER 5 OPEN SPOT]", "RED PLAYER 5 ID", "[EMPTY SPOT]"]],
        // ]);

        const eventChannel = interaction.options.getChannel("event-voice-channel");
        if (eventChannel.type !== 2) {
            return interaction.reply({
                content: `⚠️ Unable to run this command because you gave me an invalid voice channel. You gave me ${eventChannel} as your event voice channel.`,
                ephemeral: true
            });
        }

        const eventPing = `<@&${customARAMrole}>`
        let lobbyRunner = interaction.user.username
        if (interaction.member.nickname !== null) { lobbyRunner = interaction.member.nickname }
        let channelComannd = client.channels.cache.get(interaction.channelId);

        const team1Button = new ButtonBuilder()
            .setCustomId('team1')
            .setLabel('TEAM 1')
            .setStyle(ButtonStyle.Primary)

        const team2Button = new ButtonBuilder()
            .setCustomId('team2')
            .setLabel('TEAM 2')
            .setStyle(ButtonStyle.Primary)

        const removeYourselfButton = new ButtonBuilder()
            .setCustomId('removeYourself')
            .setLabel('REMOVE')
            .setStyle(ButtonStyle.Danger)

        const info = new ButtonBuilder()
            .setCustomId('info')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔍')

        const settings = new ButtonBuilder()
            .setCustomId('settings')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⚙️')

        const row = new ActionRowBuilder()
            .addComponents(team1Button, team2Button, removeYourselfButton, info, settings);

        // This line updates the permissions for the 'leagueRole' to view the 'eventChannel', and then sets the user limit of the channel to 15.
        eventChannel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }).then(() => eventChannel.setUserLimit(15));

        const eventTitle = interaction.options.getString("event-title").toUpperCase();
        const eventImage = "https://i.imgur.com/vQOcdtX.png";
        let eventMonth = interaction.options.getInteger("event-month").toString();
        let eventDay = interaction.options.getInteger("event-day").toString();
        let eventYear = "2024"

        function isValidDate(year, month, day) {
            const date = new Date(year, month - 1, day);
            return date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day;
        }

        if (!isValidDate(eventYear, eventMonth, eventDay)) {
            return interaction.reply({
                content: `⚠️ Unable to run this command because you gave me an invalid date. You gave me **${eventMonth}/${eventDay}/${eventYear}** as your event date.`,
                ephemeral: true
            });
        }

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
        let messageContent = `${eventPing} this **Custom ARAM** event will start <t:${eventDayMomentUnix}:R>`

        function isDateTimeInPast(year, month, day, hour, minute, amPm, timezone) {
            if (amPm.toLowerCase() === "pm" && hour < 12) {
                hour += 12;
            } else if (amPm.toLowerCase() === "am" && hour === 12) {
                hour = 0;
            }
            const providedDateTimeStr = `${year}-${month}-${day} ${hour}:${minute}:00`;
            let providedDateTime = momentTZ.tz(providedDateTimeStr, "YYYY-MM-DD HH:mm:ss", timezone);
            const currentDateTime = momentTZ.tz(new Date(), timezone);
            return providedDateTime.isBefore(currentDateTime);
        }

        if (isDateTimeInPast(eventYear, eventMonth, eventDay, parseInt(eventHour), parseInt(eventMinute), eventAmPm, eventTimezone)) {
            return interaction.reply({
                content: `⚠️ Unable to run this command because the date and time provided are in the past. You gave me **${eventMonth}/${eventDay}/${eventYear} ${eventHour}:${eventMinute} ${eventAmPm}** as your event date and time.`,
                ephemeral: true
            });
        }

        // Embed that will be sent at first and then later updated with the refreshEmbed function when a button is clicked.
        const customsEmbed = new EmbedBuilder()
            .setColor('#ff7ee2')
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
                    name: `1️⃣ ───── TEAM 1 ───── 1️⃣`,
                    value: `${pinkDiamondEmoji} ${playerMap.get("bluePlayer1")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer2")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer3")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer4")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer5")[0]}`,
                    inline: true,
                },
                {
                    name: `2️⃣ ───── TEAM 2 ───── 2️⃣`,
                    value: `${pinkDiamondEmoji} ${playerMap.get("redPlayer1")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer2")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer3")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer4")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer5")[0]}`,
                    inline: true,
                },
            );

        // Quick reminder message for the ARAM command. This message is sent as an ephemeral reply to the user who used the command.
        const replyMessage = await interaction.reply({
            content: `**ARAM COMMAND REMINDERS:**\n${pinkDiamondEmoji} You can use the 📌 button to send a reminder message in the league chat channel.\n${pinkDiamondEmoji} Admins can use the 🔨 button to remove a player manually if needed.`,
            ephemeral: true
        });

        // This line sends the initial event message with the embed and buttons. It also fetches the message for the collector.
        const message = await channelComannd.send({
            content: messageContent,
            embeds: [customsEmbed],
            components: [row],
            fetchReply: true,
        })

        // Button filter and button collector for the ARAM lobby message. The filter checks if the interaction is a button and if the customId is "team1" or "team2".
        const buttonFilter = (interaction) => interaction.isButton() && ['team1', 'team2'].includes(interaction.customId);
        const buttonCollector = message.createMessageComponentCollector({ buttonFilter, dispose: true });
        // This event is triggered when a button is collected. It logs the button, user, and time.
        buttonCollector.on('collect', async (interaction) => {
            estDateLog = new Date()
            console.log('\x1b[36m', '/kraken-aram:', '\x1b[32m', `Collected [${interaction.customId.toUpperCase()}] from [${interaction.user.username}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m');
            const fullUserName = interaction.user.tag.toString();
            const userNameID = interaction.user.id.toString();
            usernameNoTag = fullUserName.substring(0, fullUserName.length - 5);
            const valuesArray = [];
            // This function checks if the user is already in the playerMap. It iterates over the values in the playerMap and pushes the result of the check to the valuesArray.
            async function checkIDs(nameID) {
                for (const [key, value] of playerMap) {
                    valuesArray.push(value.includes(nameID))
                }
            }
            checkIDs(userNameID);

            const buttonPlayerMap = {
                'team1': ["bluePlayer1", "bluePlayer2", "bluePlayer3", "bluePlayer4", "bluePlayer5"],
                'team2': ["redPlayer1", "redPlayer2", "redPlayer3", "redPlayer4", "redPlayer5"]
            };

            // This line checks if the interaction is a button. If it's not, the function returns.
            if (!interaction.isButton()) return;

            // This loop checks if the button clicked is a team button and if the user is not already on a team.
            for (const [buttonId, players] of Object.entries(buttonPlayerMap)) {
                if (interaction.customId === buttonId && !valuesArray.includes(true)) {
                    let openSpotFound = false;
                    for (const player of players) {
                        if (playerMap.get(player).includes(`[PLAYER ${player.slice(-1)} OPEN SPOT]`)) {
                            playerMap.set(player, [`<@${userNameID}>`, userNameID, fullUserName]);
                            await checkIDs(userNameID);
                            await interaction.reply({ content: `✅ You have succesfully been added to this event!`, ephemeral: true });
                            openSpotFound = true;
                            break;
                        }
                    }
                    if (!openSpotFound) {
                        await interaction.reply({ content: `⚠️ All spots have been filled for this Team. Unable to sign you up.`, ephemeral: true });
                    }
                    break;
                }
                if (interaction.customId === buttonId && valuesArray.includes(true)) {
                    await interaction.reply({ content: `⚠️ You are already signed up for this event. If you want to change Teams, click the **REMOVE** button and sign up again.`, ephemeral: true });
                }
            }

            // This line checks if the interaction is a button. If it's not, the function returns.
            if (interaction.customId === "removeYourself") {
                await checkIDs(userNameID); // Ensure this is awaited so valuesArray is populated
                if (valuesArray.includes(true)) {
                    setDefault(userNameID);
                    interaction.reply({ content: `✅ You have been successfully removed from this event.`, ephemeral: true });
                } else {
                    interaction.reply({ content: `⚠️ Unable to remove you as you have not signed up for this event.`, ephemeral: true });
                }
            }

            refreshEmbed();

            if (interaction.customId === "settings" && interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                const pin = new ButtonBuilder()
                    .setCustomId('pin')
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('REMINDER MESSAGE')
                    .setEmoji('📌')

                const hammer = new ButtonBuilder()
                    .setCustomId('hammer')
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('REMOVE PLAYER')
                    .setEmoji('🔨')

                const settingsRow = new ActionRowBuilder()
                    .addComponents(pin, hammer);

                await interaction.reply({
                    content: `⚠️ What would you like to do? Make a selection <t:${moment().add(60, 'seconds').unix()}:R>.\n`,
                    components: [settingsRow],
                    ephemeral: true
                });

                const filter = i => i.user.id === interaction.user.id;
                const settingsButtonCollector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                settingsButtonCollector.on('collect', async i => {
                    console.log('\x1b[36m', '/kraken-aram:', '\x1b[32m', `Collected [${i.customId.toUpperCase()}] from [${i.user.username}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m');
                    if (i.customId === 'pin') {
                        if (i.member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                            let countOfEmpty = Array.from(playerMap.values()).filter(value => value[2] === '[EMPTY SPOT]').length;
                            if (countOfEmpty > 0) {
                                const channel = client.channels.cache.get(leagueChatChannel);
                                let spotsText = countOfEmpty === 1 ? "spot" : "spots";
                                await channel.send({
                                    content: `${eventPing} There ${countOfEmpty === 1 ? "is" : "are"} **${countOfEmpty}** ${spotsText} open in the **Custom ARAM** event! Go to <#${mojitoAramChannel}> to sign up!`,
                                });
                                await i.update({ content: `✅ Successfully sent a reminder message.`, components: [], ephemeral: true });
                                settingsButtonCollector.stop();

                            } else {
                                await i.update({ content: `⚠️ Unable to send a reminder message as this event is full.`, components: [], ephemeral: true });
                                settingsButtonCollector.stop();
                            }
                        } else {
                            await i.update({ content: `⚠️ You do not have the correct permissions to use this button.`, components: [], ephemeral: true });
                            settingsButtonCollector.stop();
                        }
                    } else if (i.customId === 'hammer') {
                        if (i.member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                            const allEmpty = Array.from(playerMap.values()).every(value => value[2] === "[EMPTY SPOT]");
                            if (!allEmpty) {
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

                                // Use i.reply or i.followUp based on whether you've already replied to the interaction
                                await i.reply({
                                    content: `What player would you like to remove? Make a selection <t:${moment().add(60, 'seconds').unix()}:R>.\n`,
                                    components: [row],
                                    ephemeral: true
                                });

                                const filter = (interaction) => interaction.customId === 'playerSelect' && interaction.user.id === userNameID;
                                const removePlayerCollector = i.channel.createMessageComponentCollector({ filter, time: 60000 });

                                removePlayerCollector.on('collect', async (interaction) => {
                                    const selectedValue = interaction.values[0];
                                    let tempPlayer = playerMap.get(selectedValue)[2];
                                    setDefault(playerMap.get(selectedValue)[1]);
                                    await interaction.update({ content: `✅ The player **${tempPlayer}** has been removed from this event.`, components: [] });
                                    removePlayerCollector.stop();
                                    settingsButtonCollector.stop();
                                });

                                removePlayerCollector.on('end', collected => {
                                    if (!collected.size) i.editReply({ content: '⚠️ No selection was made.', components: [] });
                                });
                            } else if (allEmpty) {
                                settingsButtonCollector.stop();
                                i.reply({ content: `⚠️ There are not any players signed up for this event for me to remove.`, ephemeral: true });
                            }
                        } else if (!i.member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                            settingsButtonCollector.stop();
                            i.reply({ content: `⚠️ You do not have the correct permissions to use this button.`, ephemeral: true });
                        }
                    }
                });

                settingsButtonCollector.on('end', collected => {
                    if (!collected.size) {
                        interaction.editReply({ content: '⚠️ No selection was made.', components: [], ephemeral: true });
                    }
                });
            } else if (interaction.customId === "settings" && !interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                interaction.reply({ content: `⚠️ You do not have the correct permissions to use this button.`, ephemeral: true });
            }

            if (interaction.customId === "info") {
                let playerValues = [
                    playerMap.get("bluePlayer1")[0],
                    playerMap.get("bluePlayer2")[0],
                    playerMap.get("bluePlayer3")[0],
                    playerMap.get("bluePlayer4")[0],
                    playerMap.get("bluePlayer5")[0],
                    playerMap.get("redPlayer1")[0],
                    playerMap.get("redPlayer2")[0],
                    playerMap.get("redPlayer3")[0],
                    playerMap.get("redPlayer4")[0],
                    playerMap.get("redPlayer5")[0]
                ];

                let filteredValues = playerValues.filter(value => !value.includes("OPEN SPOT]"));
                let result = filteredValues.join(', ');

                if (result) {
                    let playerNames = result.split(', ');
                    let message;

                    if (playerNames.length === 1) {
                        message = `✅ The player currently signed up for this event is ${playerNames[0]}.`;
                    } else if (playerNames.length === 2) {
                        message = `✅ The players currently signed up for this event are ${playerNames[0]} and ${playerNames[1]}.`;
                    } else {
                        let lastPlayer = playerNames.pop();
                        message = `✅ The players currently signed up for this event are ${playerNames.join(', ')}, and ${lastPlayer}.`;
                    }

                    interaction.reply({ content: message, ephemeral: true });
                } else {
                    interaction.reply({ content: `⚠️ Unable to fetch player information for this event because nobody has signed up yet.`, ephemeral: true });
                }
            }

            // This function sets the default values for a user in the playerMap.
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
        });

        // This event is triggered when the collector stops collecting reactions.
        buttonCollector.on('end', (collected) => {
            console.log('\x1b[36m', '/kraken-aram:', '\x1b[31m', `Collected ${collected.size} total button reactions`, '\x1b[0m');
        });

        const eventDayMoment = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`);
        const second = 1000;
        // Functionality for starting and stopping the event. This function is called when the event time is reached. 
        async function intervals() {
            const countDownFn = () => {
                const today = convertTZ(`${moment()}`, `${eventTimezone}`)
                const timeSpan = eventDayMoment.diff(today);
                if (timeSpan <= -today || timeSpan <= 0) {
                    clearInterval(interval);
                    if (timeSpan <= 0) {
                        startEvent();
                    } else {
                        buttonCollector.stop();
                    }
                    return;
                } else if (!eventDayMoment.isValid()) {
                    stopIntervalWithError();
                }
            };

            const startEvent = () => {
                buttonCollector.stop();
                eventChannel.createInvite()
                    .then(invite => message.reply({
                        content: `${eventPing} **${eventTitle}** has started!\nAll players will join ${invite}`
                    })).catch(handleError);

                messageContent = `${eventPing}`
                message.edit({ content: `${messageContent}` }).catch(handleError);
                delayEdit();
            };

            const stopIntervalWithError = () => {
                buttonCollector.stop();
                clearInterval(interval);
                interaction.followUp({
                    embeds: [embeds.formatEmbed],
                    ephemeral: true
                });
                message.delete().catch(handleError);
            };

            const handleError = (error) => {
                if (error.code !== 10008) {
                    console.log('\x1b[36m', `/kraken-aram: Unable to continue the interval function as the original message was deleted`, '\x1b[0m')
                }
            };

            const interval = setInterval(countDownFn, second);
        }

        intervals();

        // This function stops the reaction collector after a delay of 20 minutes. It uses the setTimeout function to schedule the collector.stop() call.
        async function delayEdit() {
            setTimeout(() => {
                buttonCollector.stop();
            }, 20 * 60 * 1000);
        }

        // This function refreshes the embed for the ARAM lobby message.
        async function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#ff7ee2')
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
                        name: `1️⃣ ───── TEAM 1 ───── 1️⃣`,
                        value: `${pinkDiamondEmoji} ${playerMap.get("bluePlayer1")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer2")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer3")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer4")[0]}\n${pinkDiamondEmoji} ${playerMap.get("bluePlayer5")[0]}`,
                        inline: true,
                    },
                    {
                        name: `2️⃣ ───── TEAM 2 ───── 2️⃣`,
                        value: `${pinkDiamondEmoji} ${playerMap.get("redPlayer1")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer2")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer3")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer4")[0]}\n${pinkDiamondEmoji} ${playerMap.get("redPlayer5")[0]}`,
                        inline: true,
                    },
                );
            message.edit({ embeds: [customsEmbed], content: `${messageContent}`, }).catch(error => {
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    }
};