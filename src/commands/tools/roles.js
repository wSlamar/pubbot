const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { aramEmoji } = process.env;
const { customAramEmoji } = process.env;
const { riftEmoji } = process.env;
const { customRiftEmoji } = process.env;
const { tftEmoji } = process.env;
const { leagueEmoji } = process.env;
const { localPubEmoji } = process.env;
const { subRolesChannel } = process.env;
const { ironEmoji } = process.env;
const { bronzeEmoji } = process.env;
const { silverEmoji } = process.env;
const { goldEmoji } = process.env;
const { platinumEmoji } = process.env;
const { diamondEmoji } = process.env;
const { masterEmoji } = process.env;
const { grandmasterEmoji } = process.env;
const { challengerEmoji } = process.env;
const { unrankedEmoji } = process.env;
const { botPositionEmoji } = process.env;
const { fillPositionEmoji } = process.env;
const { junglePositionEmoji } = process.env;
const { midPositionEmoji } = process.env;
const { supportPositionEmoji } = process.env;
const { topPositionEmoji } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-roles")
        .setDescription("Return an embed for users to react to in order to get their role")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) => option
            .setName("roles-option")
            .setDescription("roles embed that will be sent")
            .setRequired(true)
            .addChoices(
                { name: 'Main Roles', value: 'Main Roles' },
                { name: 'Sub Roles', value: 'Sub Roles' },
            )
        ),
    async execute(interaction, client) {
        console.log('\x1b[36m', '/pub-roles has been kicked off', '\x1b[0m')
        const rolesOption = interaction.options.getString("roles-option");
        const roles = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/DKt79Ey.png')
            .setTitle(`${localPubEmoji}  THE LOCAL PUBS MAIN ROLES  ${localPubEmoji}`)
            .setFooter({ text: "❗❗❗ READ AND ACCEPT OUR RULES TO GAIN MORE ACCESS TO THE CHANNELS ❗❗❗" })
            .setDescription(`Welcome to The Local Pub! Please react to receive the corresponding role! These roles will give you access to the rest of the server.\n‎`)
            .addFields(
                {
                    name: `${leagueEmoji}  LEAGUE OF LEGENDS  ${leagueEmoji}`,
                    value: `This role will grant you access to all of the League of Legends related channels.\n‎`,
                },
                {
                    name: `${aramEmoji}  CUSTOM ARAM  ${aramEmoji}`,
                    value: `This role will grant you the ability to be pinged when Custom ARAM events or in-house lobbies are started.\n‎`,
                },
                {
                    name: `${riftEmoji}  CUSTOM SUMMONERS RIFT  ${riftEmoji}`,
                    value: `This role will grant you the ability to be pinged when Custom Summoners Rift events or in-house lobbies are started.\n‎`,
                },
                {
                    name: `${tftEmoji}  TFT  ${tftEmoji}`,
                    value: `This role will grant you the ability to be pinged when TFT events or in-house lobbies are started.\n‎`,
                },
                {
                    name: ":video_game: OTHER GAMES :video_game:",
                    value: `This role will grant you access to other games related channels.\n‎`,
                },
            )
        const subRolesRanks = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/SqkZOD4.png')
            .setTitle(`${leagueEmoji}  LEAGUE OF LEGENDS RANK ROLES  ${leagueEmoji}`)
            .setDescription(`React below to show your League Of Legends rank! The main purpose of these roles is to find other players similar to your rank and queue together. If you rank up or rank down, make sure to come back here to adjust your role so other players can find you for ranked games!\n‎`)
            .addFields(
                {
                    name: `${unrankedEmoji}  UNRANKED  ${unrankedEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${ironEmoji}  IRON  ${ironEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `${bronzeEmoji}  BRONZE  ${bronzeEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${silverEmoji}  SILVER  ${silverEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `${goldEmoji}  GOLD  ${goldEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${platinumEmoji}  PLATINUM  ${platinumEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `${diamondEmoji}  DIAMOND  ${diamondEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${masterEmoji}  MASTER  ${masterEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `${grandmasterEmoji}  GRANDMASTER  ${grandmasterEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${challengerEmoji}  CHALLENGER  ${challengerEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: ` `,
                    inline: true,
                },
            )
        const subRolesPositions = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/n4kRYPN.png')
            .setTitle(`${leagueEmoji}  LEAGUE OF LEGENDS POSITION ROLES  ${leagueEmoji}`)
            .setDescription(`React below to show the League Of Legends postions that you play! The main purpose of these roles is to find other players based on what postions they play and queue together.\n‎`)
            .addFields(
                {
                    name: `${botPositionEmoji}  BOT  ${botPositionEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${fillPositionEmoji}  FILL  ${fillPositionEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `${junglePositionEmoji}  JUNGLE  ${junglePositionEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${midPositionEmoji}  MID  ${midPositionEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `${supportPositionEmoji}  SUPPORT  ${supportPositionEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `${topPositionEmoji}  TOP  ${topPositionEmoji}`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: ` `,
                    inline: true,
                },
            )
        const subRolesTimezone = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/I2HkrQm.png')
            .setTitle(`🗺️  TIME ZONE ROLES  🗺️`)
            .setDescription(`React below to show the Time Zone that you are in! The main purpose of these roles is to know what time zone each member is in for planning and gaming.\n‎`)
            .addFields(
                {
                    name: `🗽  EASTERN TIME  🗽`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `🌆  CENTRAL TIME  🌆`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `🏔️  MOUNTAIN TIME  🏔️`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `🌊  PACIFIC TIME  🌊`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `🧊  ALASKA TIME  🧊`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: `🏝️  HAWAII TIME  🏝️`,
                    value: ` `,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: ` `,
                    inline: true,
                },
            )

        let channelComannd = client.channels.cache.get(interaction.channelId);

        const replyMessage = await interaction.reply({
            content: "/pub-roles has been kicked off",
            ephemeral: true
        });

        if (rolesOption == 'Main Roles') {
            const message = await channelComannd.send({
                embeds: [roles],
            });

            const subRolesNavEmbed = new EmbedBuilder()
                .setColor('#167301')
                .setDescription(`Once you have gotten your main server roles, check out some of our sub roles in the <#${subRolesChannel}> thread!`)

            message.reply({
                embeds: [subRolesNavEmbed]
            })
        }
        if (rolesOption == 'Sub Roles') {
            const message = await channelComannd.send({
                embeds: [subRolesRanks],
            });
            message.reply({
                embeds: [subRolesPositions],
            })
            message.reply({
                embeds: [subRolesTimezone],
            })
        }

    }
};
