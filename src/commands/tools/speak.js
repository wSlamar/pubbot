const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-speak")
        .setDescription("Will return a custom message as if it came from Mojito")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) => option
            .setName("message")
            .setDescription("custom message you would like Mojito to say")
            .setRequired(true)
        ),

    async execute(interaction, client) {
        const stringMessage = interaction.options.getString("message");
        let channelComannd = client.channels.cache.get(interaction.channelId);
        console.log('\x1b[36m', `/pub-speak has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}] saying [${stringMessage}]`, '\x1b[0m')

        const replyMessage = await interaction.reply({
            content: "/pub-speak has been kicked off",
            ephemeral: true
        });

        const message = await channelComannd.send({
            content: `${stringMessage}`,
        });
    }
};
