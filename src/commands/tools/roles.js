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
const { barOwnerEmoji } = process.env;
const { barKeepsEmoji } = process.env;
const { beerNutsEmoji } = process.env;
const { bouncersEmoji } = process.env;
const { artistEmoji } = process.env;
const { pubBoosterEmoji } = process.env;
const { localcsEmoji } = process.env;
const { showcaseChannel } = process.env;
const { bigBrainEmoji } = process.env;
const { cinematographerEmoji } = process.env;
const { bartenderEmoji } = process.env;
const { barflyEmoji } = process.env;
const { jukeboxChannel } = process.env;

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
                // { name: 'Main Roles', value: 'Main Roles' },
                // { name: 'Sub Roles', value: 'Sub Roles' },
                { name: 'XP Roles', value: 'XP Roles' },
                { name: 'Who We Are', value: 'Roles Explanation' },
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
            .setDescription(`Welcome to The Local Pub! Please react to receive the corresponding role! These roles will give you access to the rest of the community.\n‎`)
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
        const rolesExplanation = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/DKt79Ey.png')
            .setTitle(`${localPubEmoji}  WHO WE ARE  ${localPubEmoji}`)
            .setDescription(`Below you will find an explanation of each role in the community and what their purpose is. If you have any interest in becoming a higher level role in our community, please reach out to one of our Bar Owners, Barkeeps or Bartenders!\n‎`)
            .addFields(
                {
                    name: `${barOwnerEmoji}  BAR OWNERS  ${barOwnerEmoji}`,
                    value: `The Bar Owners are the community admins of The Local Pub.\n‎`,
                },
                {
                    name: `${bartenderEmoji}  BARTENDERS  ${bartenderEmoji}`,
                    value: `The Bartenders are sub-admins of The Local Pub. You will frequently see them moderating and playing within the community.\n‎`,
                },
                {
                    name: `${barKeepsEmoji}  BARKEEPS  ${barKeepsEmoji}`,
                    value: `The Barkeeps are the community moderators of The Local Pub. You will frequently see them hosting our custom lobbies / games and moderating the community.\n‎`,
                },
                {
                    name: `${beerNutsEmoji}  BEER NUTS  ${beerNutsEmoji}`,
                    value: `The Beer Nuts are our custom lobby hosts and you will frequently see them hosting our custom lobbies / games.\n‎`,
                },
                {
                    name: `${barflyEmoji}  BAR FLY  ${barflyEmoji}`,
                    value: `The Bar Flies are the community members of The Local Pub who help keep the community a safe and fun environment.\n‎`,
                },
                {
                    name: `${bouncersEmoji}  BOUNCERS  ${bouncersEmoji}`,
                    value: `The Bouncers are the bots of The Local Pub and help us manage the community.\n‎`,
                },
                {
                    name: `${artistEmoji}  PUB PATREON  ${artistEmoji}`,
                    value: `The Pub Patreons are the sponsored patreons of The Local Pub and collaborate with us to do giveaways to our members. Check out some of their work in the <#${showcaseChannel}> channel!\n‎`,
                },
                {
                    name: `${pubBoosterEmoji}  PUB BOOSTER  ${pubBoosterEmoji}`,
                    value: `The Pub Boosters are members who community boost The Local Pub.\n‎`
                },
                {
                    name: `${bigBrainEmoji}  BIG BRAIN  ${bigBrainEmoji}`,
                    value: `The Big Brain title is awarded to the most current winner of our Pub Trivia Nights that we host. This role gets passed on each time there is a new first place winner.\n‎`,
                },
                {
                    name: `${cinematographerEmoji}  CINEMATOGRAPHER  ${cinematographerEmoji}`,
                    value: `The Cinematographers are members of The Local Pub who host our movie nights.\n‎`
                },
                {
                    name: `${localcsEmoji}  LOCALS  ${localcsEmoji}`,
                    value: `The Locals are the community members of The Local Pub.`
                },
            )

        const xpRoles = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/DKt79Ey.png')
            .setTitle(`${localPubEmoji}  PUB XP ROLES  ${localPubEmoji}`)
            .setDescription(`Below are all of the Local Pub's XP Roles that are granted once you reach a certain XP level within the community. There are currently two ways to earn XP in the Local Pub.\n\n The first way is posting messages within the community chats. Bonus XP is granted to those who take time into their posts.\n\n The second way is being active within voice channels. You do get minor points for sitting mute but ultimately people who talk and engage in conversations will gain more.\n‎`)
            .addFields(
                {
                    name: `${barOwnerEmoji}  SOBER  ${barOwnerEmoji}`,
                    value: `The Sober role is granted at **Level 5**. This will grant you access to the <#${jukeboxChannel}> channel. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${bartenderEmoji}  TIPSY  ${bartenderEmoji}`,
                    value: `The Tipsy role is granted at **Level 10**. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${barKeepsEmoji}  VIBIN  ${barKeepsEmoji}`,
                    value: `The Vibin role is granted at **Level 15**. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${beerNutsEmoji}  BUZZED  ${beerNutsEmoji}`,
                    value: `The Buzzed role is granted at **Level 20**. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${barflyEmoji}  TOASTED  ${barflyEmoji}`,
                    value: `The Toasted role is granted at **Level 25**. This will grant you access to exclusive chat and voice lobbies. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${bouncersEmoji}  PLASTERED  ${bouncersEmoji}`,
                    value: `The Plastered role is granted at **Level 30**. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${artistEmoji}  ROASTED  ${artistEmoji}`,
                    value: `The Roasted role is granted at **Level 35**. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${pubBoosterEmoji}  HAMMERED  ${pubBoosterEmoji}`,
                    value: `The Hammered role is granted at **Level 40**. Your role icon will change to the emoji above once you reach this level.\n‎`
                },
                {
                    name: `${bigBrainEmoji}  FRIED  ${bigBrainEmoji}`,
                    value: `The Fried role is granted at **Level 45**. Your role icon will change to the emoji above once you reach this level.\n‎`,
                },
                {
                    name: `${cinematographerEmoji}  CROSS FADED  ${cinematographerEmoji}`,
                    value: `The Cross Faded role is granted at **Level 50**. This will grant you access to the Local Pub's giveaway channel where you have a chance to receive a free weekly giveaway (Steam Keys, Pub Merchandise, RP). Your role icon will change to the emoji above once you reach this level.`
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
                .setDescription(`Once you have gotten your main community roles, check out some of our sub roles in the <#${subRolesChannel}> thread!`)

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
        if (rolesOption == 'Roles Explanation') {
            const message = await channelComannd.send({
                embeds: [rolesExplanation],
            });
        }
        if (rolesOption == 'XP Roles') {
            const message = await channelComannd.send({
                embeds: [xpRoles],
            });
        }
    }
};
