const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-help")
        .setDescription("Replies with an embed for displaying helpful tips on the commands")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {
        console.log('\x1b[36m','/pub-help has been kicked off','\x1b[0m')
        const helpEmbed = new EmbedBuilder()
            .setColor('#167301')
            .setFooter({text: 'Made with ❤️ by meatbuck'})
            .setTitle("BOT HELP")
            .setURL('https://youneedawiki.com/app/page/1Th5IlY3BP6nHH6hNliqa_xQ7fYxbnI1v')
            .setDescription("The list of commands has been provided below with an overview of their functions. For additonal information on these commands, click the link above.\n‎")
            .addFields(
                {
                    name: "🍺  /pub-5v5 command",
                    value: "This commands main function is to track a list of players who want to participate in a 5 VS 5 team event. Once this command has been kicked off, users are able to react to the embed and choose which team they would like to be on for the event. The users @ tag will be populated in the list and will display within the embed under the team that they chose. Once this command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                }, 
                {
                    name: "🍺  /pub-8-player command",
                    value: "This commands main function is to track a list of players who want to participate in an 8 player event. Once this command has been kicked off, users are able to react to the embed and the users @ tag will be populated in the list displaying within the embed under the PLAYERS header. Once this command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                },
                {
                    name: "🍺  /pub-poll command",
                    value: "This command's main function is to create a two option poll that users can react to.\n‎",
                },
                {
                    name: "🍺  /pub-bug command",
                    value: "This command's main function is to track any bugs or issues associated with the bot.\n‎",
                },
            )

        const message = await interaction.reply({
            embeds: [helpEmbed],
            ephemeral: true
        });
    }
};