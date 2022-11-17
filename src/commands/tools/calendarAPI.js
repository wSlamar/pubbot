const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const getAPIValues = require('../../events/client/api.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-calendar")
        .setDescription("Return thy calendar")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog),
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            content: 'Here comes your API...',
            fetchReply: true,
        });

        getAPIValues()
            .then(({ title, who }) => {
                interaction.editReply({
                    content: title
                });
            }).catch(console.error);
    }
};