const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-help")
        .setDescription("Replies with an embed for displaying helpful tips on the commands")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {

        const helpEmbed = new EmbedBuilder()
            .setColor('#AB561C')
            .setTitle("BOT HELP")
            .setURL('https://youneedawiki.com/app/page/1Th5IlY3BP6nHH6hNliqa_xQ7fYxbnI1v')
            .setDescription("The list of commands has been provided below with an overview of their functions. For additonal information on these commands, click the link above.\n‎")
            .addFields(
                {
                    name: "🍺  /pub-5v5 command",
                    value: "This commands main function is to track a list of players who want to participate in a 5 VS 5 team event. Once this command is used by a moderator, users are able to react to the embed and choose which team they would like to be on for the event. The users @ tag will be populated in the list and will display within the embed under the team that they chose.\n\n🍷  **event-title:** Title of the event\n🍷  **event-description:** Description of the event\n🍷  **event-ping:** What role or user you would like to ping for the event\n🍷  **event-month:** Month of the event\n🍷  **event-day:** Day of the event\n🍷  **event-year:** Year of the event\n🍷  **event-time:** Time of the event\n🍷  **event-image:** Imgur link of the image to be displayed in the embed\n🍷  **team-1-emoji:** Emoji that will be associated with the Team 1 reaction\n🍷  **team-2-emoji:** Emoji that will be associated with the Team 2 reaction\n‎",
                }, 
                {
                    name: "🍺  /pub-8-player command",
                    value: "This commands main function is to track a list of players who want to participate in an 8 player event. Once this command is used by a moderator, users are able to react to the embed and the users @ tag will be populated in the list, displaying within the embed under the PLAYERS header.\n\n🍷  **event-title:** Title of the event\n🍷  **event-description:** Description of the event\n🍷  **event-ping:** What role or user you would like to ping for the event\n🍷  **event-month:** Month of the event\n🍷  **event-day:** Day of the event\n🍷  **event-year:** Year of the event\n🍷  **event-time:** Time of the event\n🍷  **event-image:** Imgur link of the image to be displayed in the embed\n🍷  **player-emoji:** Emoji that will be associated with the player reaction\n‎",
                },
                {
                    name: "🍺  /pub-bug command",
                    value: "This command's main function is to track any bugs or issues associated with the bot.\n\n🍷  **bug-title:** Title of the bug\n🍷  **bug-description:** Description of the bug\n🍷  **bug-screenshot:** Screenshot of the bug",
                },
            )

        const message = await interaction.reply({
            embeds: [helpEmbed],
            fetchReply: true,
            ephemeral: true
        });
    }
};