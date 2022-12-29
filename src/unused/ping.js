const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-ping")
        .setDescription("Return ping")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
        .addMentionableOption((option) => option
            .setName("ping")
            .setDescription("ping role")
            .setRequired(true)
        ),
    async execute(interaction, client) {
        const eventPing = interaction.options.getMentionable("ping");

        // this does not mention the role
        const message = await interaction.reply({
            content: `${eventPing}`,
            fetchReply: true
        })

        // this will mention the role
        const messageReply = message.reply({
            content: `${eventPing}`,
        });
    }
};
