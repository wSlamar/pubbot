const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kraken-speak")
        .setDescription("Command for creating a message as if it came from Kraken")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) => option
            .setName("message")
            .setDescription("custom message you would like Kraken to say")
            .setRequired(false)
        )
        .addAttachmentOption((option) => option
            .setName("image")
            .setDescription("image you would like Kraken to send")
            .setRequired(false)
        ),

    async execute(interaction, client) {
        const stringMessage = interaction.options.getString("message");
        const image = interaction.options.getAttachment("image");
        let channelComannd = client.channels.cache.get(interaction.channelId);
        console.log('\x1b[36m', `/kraken-speak has been kicked off by [${interaction.user.username}#${interaction.user.discriminator}]`, '\x1b[0m')

        const replyMessage = await interaction.reply({
            content: "/kraken-speak has been kicked off",
            ephemeral: true
        });

        if (stringMessage != null && image == null) {
            const message = await channelComannd.send({
                content: `${stringMessage}`,
            });
        } else if (stringMessage == null && image != null) {
            const message = await channelComannd.send({
                files: [image],
            })
        } else {
            const message = await channelComannd.send({
                content: `${stringMessage}`,
                files: [image],
            });
        }

    }
};
