const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { aramEmoji } = process.env;
const { customAramEmoji } = process.env;
const { riftEmoji } = process.env;
const { customRiftEmoji } = process.env;
const { tftEmoji } = process.env;
const { leagueEmoji } = process.env;
const { localPubEmoji } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-roles")
        .setDescription("Return an embed for users to react to in order to get their role")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        console.log('\x1b[36m','/pub-roles has been kicked off','\x1b[0m')
        const roles = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/DKt79Ey.png')
            .setTitle(`${localPubEmoji}  THE LOCAL PUB ROLES  ${localPubEmoji}`)
            .setFooter({text: "❗❗❗ READ AND ACCEPT OUR RULES TO GAIN MORE ACCESS TO THE CHANNELS ❗❗❗"})
            .setDescription(`Welcome to The Local Pub! Please react to receive the corresponding role! These roles will give you access to the rest of the server.\n‎`)
            .addFields(
                {
                    name: `${leagueEmoji}  LEAGUE OF LEGENDS  ${leagueEmoji}`,
                    value: `This role will grant you access to all League of Legends related channels.\n‎`,
                },
                {
                    name: `${aramEmoji}  Custom ARAM  ${aramEmoji}`,
                    value: `This role will grant you the ability to be pinged when Custom ARAM events are started.\n‎`,
                },
                {
                    name: `${riftEmoji}  Custom Summoners Rift  ${riftEmoji}`,
                    value: `This role will grant you the ability to be pinged when Custom Summoners Rift events are started.\n‎`,
                },
                {
                    name: `${tftEmoji}  TFT  ${tftEmoji}`,
                    value: `This role will grant you the ability to be pinged when TFT events are started.\n‎`,
                },
                {
                    name: ":video_game: Other Games :video_game:",
                    value: `This role will grant you access to other games related channels.\n‎`,
                },
            )

        let channelComannd = client.channels.cache.get(interaction.channelId);

        const replyMessage = await interaction.reply({
            content: "/pub-roles has been kicked",
            ephemeral: true
        });

        const message = await channelComannd.send({
            embeds: [roles],
        });
    }
};
