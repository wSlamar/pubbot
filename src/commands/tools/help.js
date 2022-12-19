const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-help")
        .setDescription("Returns some helpful tips about the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {

        const helpEmbed = new EmbedBuilder()
            .setColor('#AB561C')
            .setTitle("BOT HELP")
            .setURL('https://youneedawiki.com/app/page/1Th5IlY3BP6nHH6hNliqa_xQ7fYxbnI1v')
            .setDescription("The list of commands has been provided below with a short description of their functions. For additonal information on these commands, click the link above.")
            .addFields(
                {
                    name: "🍺  /pub-5v5",
                    value: "This commands main function is to track a list of players who want to participate in a 5 VS 5 team event. Once this command is used by a moderator, users are able to react to the embed and choose which team they would like to be on for the event. The users @ tag will be populated in the list and will display within the embed under the team that they chose.",
                },
                {
                    name: "🍺  /pub-8-player",
                    value: "This commands main function is to track a list of players who want to participate in an 8 player event. Once this command is used by a moderator, users are able to react to the embed and the users @ tag will be populated in the list, displaying within the embed under the PLAYERS header.",
                },
                {
                    name: "🍺  /pub-bug",
                    value: "This command's main function is to track any bugs or issues associated with the bot.",
                },
            )

        const message = await interaction.reply({
            embeds: [helpEmbed],
            fetchReply: true,
            ephemeral: true
        });
    }
};