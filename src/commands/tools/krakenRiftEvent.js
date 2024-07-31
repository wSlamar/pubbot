const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const { adminChannel } = process.env;
const { leagueChatChannel } = process.env;
const { mojitoSrChannel } = process.env;
const { aramEmoji } = process.env;
const { riftEmoji } = process.env;
const { verifiedRole } = process.env;
const { leagueRole } = process.env;
const { customSRrole } = process.env;
const { unrankedRole } = process.env;
const { unrankedEmoji } = process.env;
const { ironRole } = process.env;
const { ironEmoji } = process.env;
const { bronzeRole } = process.env;
const { bronzeEmoji } = process.env;
const { silverRole } = process.env;
const { silverEmoji } = process.env;
const { goldRole } = process.env;
const { goldEmoji } = process.env;
const { platinumRole } = process.env;
const { platinumEmoji } = process.env;
const { diamondRole } = process.env;
const { diamondEmoji } = process.env;
const { masterRole } = process.env;
const { masterEmoji } = process.env;
const { grandmasterRole } = process.env;
const { grandmasterEmoji } = process.env;
const { challengerRole } = process.env;
const { challengerEmoji } = process.env;
const { emeraldRole } = process.env;
const { emeraldEmoji } = process.env;
const { pinkDiamondEmoji } = process.env;

const moment = require("moment");
const momentTZ = require("moment-timezone");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../../events/client/embeds.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kraken-rift")
        .setDescription("Command for creating a Custom Summoners Rift event")
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
        //         { name: 'Summoners Rift (still image)', value: 'https://i.imgur.com/dlDby0d.png' },
        //         { name: 'Summoners Rift (animated gif)', value: 'https://media1.tenor.com/images/bae10039079d3d710341da89689ae52d/tenor.gif?itemid=27606976' },
        //         { name: 'Saint Patricks Day', value: 'https://i.imgur.com/YYtOFvP.png' },
        //         { name: 'Christmas', value: 'https://i.imgur.com/J7EtAdM.png' },
        //         { name: 'Halloween', value: 'https://i.imgur.com/gpmSHOc.png' },
        //         { name: '420', value: 'https://i.imgur.com/VmSOrtY.png' },
        //         { name: 'Valentines Day', value: 'https://i.imgur.com/4PPf7Wf.png' },
        //         { name: '4th of July', value: 'https://i.imgur.com/UimNKTW.png' },
        //     )
        // )
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

        console.log('\x1b[36m', `/kraken-rift has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')

        const playerMap = new Map([
            ["bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer6", ["[PLAYER 6 OPEN SPOT]", "BLUE PLAYER 6 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer7", ["[PLAYER 7 OPEN SPOT]", "BLUE PLAYER 7 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer8", ["[PLAYER 8 OPEN SPOT]", "BLUE PLAYER 8 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer9", ["[PLAYER 9 OPEN SPOT]", "BLUE PLAYER 9 ID", "[EMPTY SPOT]", "❓"]],
            ["bluePlayer10", ["[PLAYER 10 OPEN SPOT]", "BLUE PLAYER 10 ID", "[EMPTY SPOT]", "❓"]],
        ]);

        // const playerMap = new Map([
        //     ["bluePlayer1", ["<@238519076769628171>", "238519076769628171", "pulldaleverkronk", "<:lol2_gold:1073393916348481556>"]],
        //     ["bluePlayer2", ["<@1057759930192510976>", "1057759930192510976", "gooby5905", "<:lol2_platinum:1073393922484744262>"]],
        //     ["bluePlayer3", ["<@456695289500270593>", "456695289500270593", "cootch", "<:lol2_diamond:1073393914448453694>"]],
        //     ["bluePlayer4", ["<@1070755820528218182>", "1070755820528218182", "ratman00570", "<:lol2_master:1073393920286928990>"]],
        //     ["bluePlayer5", ["<@437808476106784770>", "437808476106784770", "Arcane#7800", "<:lol2_gold:1073393916348481556>"]],
        //     ["bluePlayer6", ["<@656621136808902656>", "656621136808902656", "Birthday Bot#5876", "<:lol2_master:1073393920286928990>"]],
        //     ["bluePlayer7", ["<@235148962103951360>", "235148962103951360", "Carl-bot#1536", "<:lol2_gold:1073393916348481556>"]],
        //     ["bluePlayer8", ["<@903380664336928798>", "903380664336928798", "ChronicleBot#0372", "<:lol2_gold:1073393916348481556>"]],
        //     ["bluePlayer9", ["<@265523588918935552>", "265523588918935552", "DisCal#1693", "<:lol2_master:1073393920286928990>"]],
        //     ["bluePlayer10", ["[PLAYER 10 OPEN SPOT]", "BLUE PLAYER 10 ID", "[EMPTY SPOT]", "❓"]],
        // ]);

        const team1Channel = interaction.options.getChannel("team-1-voice-channel");
        const team2Channel = interaction.options.getChannel("team-2-voice-channel");
        const waitingLobbyChannel = interaction.options.getChannel("waiting-lobby-voice-channel");

        if (team1Channel.type !== 2 || team2Channel.type !== 2 || waitingLobbyChannel.type !== 2) {
            return interaction.reply({
                content: `⚠️ Unable to run this command because one of the voice channels you gave me was invalid. Here is a list of what you provided:\n\n${pinkDiamondEmoji} **Team 1 Voice Channel:** ${team1Channel}\n${pinkDiamondEmoji} **Team 2 Voice Channel:** ${team2Channel}\n${pinkDiamondEmoji} **Waiting Lobby Voice Channel:** ${waitingLobbyChannel}`,
                ephemeral: true
            });
        }

        if (team1Channel.id === team2Channel.id || team1Channel.id === waitingLobbyChannel.id || team2Channel.id === waitingLobbyChannel.id) {
            return interaction.reply({
                content: `⚠️ Unable to run this command because each voice channel must be unique. Here is a list of what you provided:\n\n${pinkDiamondEmoji} **Team 1 Voice Channel:** ${team1Channel}\n${pinkDiamondEmoji} **Team 2 Voice Channel:** ${team2Channel}\n${pinkDiamondEmoji} **Waiting Lobby Voice Channel:** ${waitingLobbyChannel}`,
                ephemeral: true
            });
        }

        const eventPing = `<@&${customSRrole}>`
        let lobbyRunner = interaction.user.username
        if (interaction.member.nickname !== null) { lobbyRunner = interaction.member.nickname }
        let channelComannd = client.channels.cache.get(interaction.channelId);

        const signupButton = new ButtonBuilder()
            .setCustomId('signup')
            .setLabel('SIGNUP')
            .setStyle(ButtonStyle.Primary)

        const removeYourselfButton = new ButtonBuilder()
            .setCustomId('removeYourself')
            .setLabel('REMOVE')
            .setStyle(ButtonStyle.Danger)

        const pin = new ButtonBuilder()
            .setCustomId('pin')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('📌')

        const hammer = new ButtonBuilder()
            .setCustomId('hammer')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔨')

        const row = new ActionRowBuilder()
            .addComponents(signupButton, removeYourselfButton, pin, hammer);

        // Set user limits for team1Channel and team2Channel to 6, and for waitingLobbyChannel to 12. 
        // After setting the user limit, update permissions to allow users with the leagueRole to view each channel.
        team1Channel.setUserLimit(6).then(() => team1Channel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }));
        team2Channel.setUserLimit(6).then(() => team2Channel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }));
        waitingLobbyChannel.setUserLimit(12).then(() => waitingLobbyChannel.permissionOverwrites.edit(leagueRole, { ViewChannel: true }));

        const eventTitle = interaction.options.getString("event-title").toUpperCase();
        const eventImage = "https://i.imgur.com/KsuGRkA.png";
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
            if (modifier.toLowerCase() === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}:${minutes}`;
        }

        const timeMilitary = `${convertTime12to24(timeStandard)}:00`
        const eventDayMomentUnix = momentTZ.tz(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`, `${eventTimezone}`).unix()
        let messageContent = `${eventPing} this **Custom Summoners Rift** event will start <t:${eventDayMomentUnix}:R>`

        function isDateTimeInPast(year, month, day, hour, minute, amPm, timezone) {
            // Convert to 24-hour format
            if (amPm.toLowerCase() === "pm" && hour < 12) {
                hour += 12;
            } else if (amPm.toLowerCase() === "am" && hour === 12) {
                hour = 0;
            }
        
            let providedDateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
            providedDateTime = momentTZ.tz(providedDateTime, timezone).toDate();
            const currentDateTime = momentTZ.tz(new Date(), timezone).toDate();
            return providedDateTime < currentDateTime;
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
            .setDescription(`${riftEmoji}  **LEAGUE OF LEGENDS CUSTOM SUMMONERS RIFT**  ${riftEmoji}`)
            .setImage(eventImage)
            .setFooter({ text: `This event was created by ${lobbyRunner}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
            .addFields(
                {
                    name: `⏰  **START TIME:** <t:${eventDayMomentUnix}:F>  ⏰`,
                    value: ` `,
                },
                {
                    name: `🔊  **QUEUE VOICE CHANNEL:** ${waitingLobbyChannel}  🔊`,
                    value: ` `
                },
                {
                    name: ' ',
                    value: ` `,
                    inline: false,
                },
                {
                    name: `${riftEmoji} ──── PLAYERS ──── ${riftEmoji}`,
                    value: `${playerMap.get("bluePlayer1")[3]} ${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[3]} ${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[3]} ${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[3]} ${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[3]} ${playerMap.get("bluePlayer5")[0]}`,
                    inline: true,
                },
                {
                    name: `${riftEmoji} ──── PLAYERS ──── ${riftEmoji}`,
                    value: `${playerMap.get("bluePlayer6")[3]} ${playerMap.get("bluePlayer6")[0]}\n${playerMap.get("bluePlayer7")[3]} ${playerMap.get("bluePlayer7")[0]}\n${playerMap.get("bluePlayer8")[3]} ${playerMap.get("bluePlayer8")[0]}\n${playerMap.get("bluePlayer9")[3]} ${playerMap.get("bluePlayer9")[0]}\n${playerMap.get("bluePlayer10")[3]} ${playerMap.get("bluePlayer10")[0]}`,
                    inline: true,
                },
                {
                    name: ' ',
                    value: ` `,
                    inline: false,
                },
                {
                    name: `1️⃣  **TEAM 1 VOICE CHANNEL:** ${team1Channel}  1️⃣`,
                    value: ` `
                },
                {
                    name: `2️⃣  **TEAM 2 VOICE CHANNEL:** ${team2Channel}  2️⃣`,
                    value: ` `
                },
            );

        // Quick reminder message for the Arena command. This message is sent as an ephemeral reply to the user who used the command.
        const replyMessage = await interaction.reply({
            content: `**SUMMONERS RIFT COMMAND REMINDERS:**\n${pinkDiamondEmoji} You can use the 📌 button to send a reminder message in the league chat channel.\n${pinkDiamondEmoji} Admins can use the 🔨 button to remove a player manually if needed.`,
            ephemeral: true
        });

        // This line sends the initial event message with the embed and buttons. It also fetches the message for the collector.
        const message = await channelComannd.send({
            content: messageContent,
            embeds: [customsEmbed],
            components: [row],
            fetchReply: true,
        });

        // Button filter and button collector for the Arena lobby message. The filter checks if the interaction is a button and if the customId is "team1" or "team2".
        const buttonFilter = (interaction) => interaction.isButton() && ['signup'].includes(interaction.customId);
        const buttonCollector = message.createMessageComponentCollector({ buttonFilter, dispose: true });
        // This event is triggered when a button is collected. It logs the button, user, and time.
        buttonCollector.on('collect', async (interaction) => {
            estDateLog = new Date()
            console.log('\x1b[36m', '/kraken-rift:', '\x1b[32m', `Collected [${interaction.customId.toUpperCase()}] from [${interaction.user.username}] at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m');
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

            const players = ["bluePlayer1", "bluePlayer2", "bluePlayer3", "bluePlayer4", "bluePlayer5", "bluePlayer6", "bluePlayer7", "bluePlayer8", "bluePlayer9", "bluePlayer10"];

            // This line checks if the interaction is a button. If it's not, the function returns.
            if (!interaction.isButton()) return;

            // This checks if the button clicked is for joining the team and if the user is not already on the team.
            if (interaction.customId === "signup" && !valuesArray.includes(true)) {
                const memberRoleCheck = message.guild.members.cache.get(userNameID);
                const roleEmojiMap = new Map([
                    [unrankedRole, unrankedEmoji],
                    [ironRole, ironEmoji],
                    [bronzeRole, bronzeEmoji],
                    [silverRole, silverEmoji],
                    [goldRole, goldEmoji],
                    [platinumRole, platinumEmoji],
                    [diamondRole, diamondEmoji],
                    [masterRole, masterEmoji],
                    [grandmasterRole, grandmasterEmoji],
                    [challengerRole, challengerEmoji],
                    [emeraldRole, emeraldEmoji],
                ]);

                let roleFound = false;
                let openSpotFound = false;
                let i = 1;
                let emojiFound;

                // Loop through each role in the roleEmojiMap
                for (let [role, emoji] of roleEmojiMap) {
                    // Check if the member has the role
                    if (memberRoleCheck.roles.cache.has(role)) {
                        roleFound = true;
                        emojiFound = emoji;
                        i++;
                        break; // Exit the loop if the role is found
                    }
                }

                // If a role is found, proceed to check for an open spot
                if (roleFound) {
                    for (const player of players) {
                        const playerNumberMatch = player.match(/\d+$/);
                        const playerNumber = playerNumberMatch ? playerNumberMatch[0] : null;
                        if (playerNumber && playerMap.get(player).includes(`[PLAYER ${playerNumber} OPEN SPOT]`)) {
                            playerMap.set(player, [`<@${userNameID}>`, userNameID, fullUserName, emojiFound]);
                            await checkIDs(userNameID);
                            await interaction.reply({ content: `✅ You have been successfully added to this event!`, ephemeral: true });
                            openSpotFound = true;
                            break; // Exit the loop if an open spot is found
                        }
                    }
                }

                if (!roleFound) {
                    await interaction.reply({ content: `⚠️ You do not have one of the required roles to sign up for this event. Head over to <id:customize> to get your League of Legends rank role and then try signing up again.`, ephemeral: true });
                }
                else if (!openSpotFound) {
                    await interaction.reply({ content: `⚠️ All spots have been filled for this event. Unable to sign you up.`, ephemeral: true });
                }

            } else if (interaction.customId === "signup" && valuesArray.includes(true)) {
                await interaction.reply({ content: `⚠️ You are already signed up for this event.`, ephemeral: true });
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

            if (interaction.customId === "hammer" && interaction.member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                const allEmpty = Array.from(playerMap.values()).every(value => value[2] === "[EMPTY SPOT]");
                if (!allEmpty) {
                    const playerSelectMenu = new StringSelectMenuBuilder()
                        .setCustomId('playerSelect')
                        .setPlaceholder('Select a player to remove')
                        .addOptions(
                            Array.from(playerMap.entries())
                                .filter(([key, value]) => value[2] !== "[EMPTY SPOT]")
                                .map(([key, value], index) => ({
                                    label: value[2],
                                    value: `bluePlayer${index + 1}`,
                                }))
                        );

                    const row = new ActionRowBuilder().addComponents(playerSelectMenu);

                    // Use interaction.reply or interaction.followUp based on whether you've already replied to the interaction
                    await interaction.reply({
                        content: `What player would you like to remove? Make a selection <t:${moment().add(60, 'seconds').unix()}:R>.\n`,
                        components: [row],
                        ephemeral: true
                    });

                    const filter = (i) => i.customId === 'playerSelect' && i.user.id === userNameID;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                    collector.on('collect', async (i) => {
                        const selectedValue = i.values[0];
                        let tempPlayer = playerMap.get(selectedValue)[2];
                        setDefault(playerMap.get(selectedValue)[1]);
                        await i.update({ content: `✅ The player **${tempPlayer}** has been removed from this event.`, components: [] });
                        collector.stop();
                    });

                    collector.on('end', collected => {
                        if (!collected.size) interaction.editReply({ content: 'No selection was made.', components: [] });
                    });
                } else if (allEmpty) {
                    interaction.reply({ content: `⚠️ There are not any players signed up for this event for me to remove.`, ephemeral: true });
                }
            } else if (interaction.customId === "hammer" && !interaction.member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                interaction.reply({ content: `⚠️ You do not have the correct permissions to use this button.`, ephemeral: true });
            }

            if (interaction.customId === "pin" && interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                let countOfEmpty = Array.from(playerMap.values()).filter(value => value[2] === '[EMPTY SPOT]').length;
                if (countOfEmpty > 0) {
                    const channel = client.channels.cache.get(leagueChatChannel);
                    let spotsText = countOfEmpty === 1 ? "spot" : "spots";
                    let reminder = await channel.send({
                        content: `${eventPing} There ${countOfEmpty === 1 ? "is" : "are"} **${countOfEmpty}** ${spotsText} open in the **Custom Summoners Rift** event! Go to <#${mojitoSrChannel}> to sign up!`,
                    });
                    interaction.reply({ content: `✅ Successfully sent a reminder message.`, ephemeral: true });
                } else if (!countOfEmpty > 0) {
                    interaction.reply({ content: `⚠️ Unable to send a reminder message as this event is full.`, ephemeral: true });
                }
            } else if (interaction.customId === "pin" && !interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) {
                interaction.reply({ content: `⚠️ You do not have the correct permissions to use this button.`, ephemeral: true });
            }

            // This function sets the default values for a user in the playerMap.
            async function setDefault(user) {
                for (const [key, value] of playerMap) {
                    if (value.includes(user)) {
                        const playerNumber = key.replace('bluePlayer', '');
                        playerMap.set(key, [`[PLAYER ${playerNumber} OPEN SPOT]`, `BLUE PLAYER ${playerNumber} ID`, "[EMPTY SPOT]", "❓"]);
                        refreshEmbed();
                    }
                }
            }
        });

        // This event is triggered when the collector stops collecting reactions.
        buttonCollector.on('end', (collected) => {
            console.log('\x1b[36m', '/kraken-rift:', '\x1b[31m', `Collected ${collected.size} total button reactions`, '\x1b[0m');
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
                waitingLobbyChannel.createInvite()
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
                    console.log('\x1b[36m', `/kraken-rift: Unable to continue the interval function as the original message was deleted`, '\x1b[0m')
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

        // This function refreshes the embed for the Arena lobby message.
        function refreshEmbed() {
            const customsEmbed = new EmbedBuilder()
                .setColor('#ff7ee2')
                .setTitle(`  ${eventTitle}  \n──────────────────────────────────────────`)
                .setDescription(`${riftEmoji}  **LEAGUE OF LEGENDS CUSTOM SUMMONERS RIFT**  ${riftEmoji}`)
                .setImage(eventImage)
                .setFooter({ text: `This event was created by ${lobbyRunner}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                .addFields(
                    {
                        name: `⏰  **START TIME:** <t:${eventDayMomentUnix}:F>  ⏰`,
                        value: ` `,
                    },
                    {
                        name: `🔊  **QUEUE VOICE CHANNEL:** ${waitingLobbyChannel}  🔊`,
                        value: ` `
                    },
                    {
                        name: ' ',
                        value: ` `,
                        inline: false,
                    },
                    {
                        name: `${riftEmoji} ──── PLAYERS ──── ${riftEmoji}`,
                        value: `${playerMap.get("bluePlayer1")[3]} ${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[3]} ${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[3]} ${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[3]} ${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[3]} ${playerMap.get("bluePlayer5")[0]}`,
                        inline: true,
                    },
                    {
                        name: `${riftEmoji} ──── PLAYERS ──── ${riftEmoji}`,
                        value: `${playerMap.get("bluePlayer6")[3]} ${playerMap.get("bluePlayer6")[0]}\n${playerMap.get("bluePlayer7")[3]} ${playerMap.get("bluePlayer7")[0]}\n${playerMap.get("bluePlayer8")[3]} ${playerMap.get("bluePlayer8")[0]}\n${playerMap.get("bluePlayer9")[3]} ${playerMap.get("bluePlayer9")[0]}\n${playerMap.get("bluePlayer10")[3]} ${playerMap.get("bluePlayer10")[0]}`,
                        inline: true,
                    },
                    {
                        name: ' ',
                        value: ` `,
                        inline: false,
                    },
                    {
                        name: `1️⃣  **TEAM 1 VOICE CHANNEL:** ${team1Channel}  1️⃣`,
                        value: ` `
                    },
                    {
                        name: `2️⃣  **TEAM 2 VOICE CHANNEL:** ${team2Channel}  2️⃣`,
                        value: ` `
                    },
                );

            message.edit({ embeds: [customsEmbed], content: `${messageContent}`, }).catch(error => {
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }
    },
}