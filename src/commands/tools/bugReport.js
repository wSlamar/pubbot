const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-bug")
        .setDescription("Reporting command for logging bugs and issues")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption((option) => option
            .setName("bug-title")
            .setDescription("title of the bug")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("bug-description")
            .setDescription("description of the bug")
            .setRequired(true)
        )
        .addAttachmentOption((option) => option
            .setName("bug-screenshot")
            .setDescription("screenshot of the bug")
            .setRequired(true)
        ),

    async execute(interaction, client) {
        const bugTitle = interaction.options.getString("bug-title");
        const bugDescription = interaction.options.getString("bug-description");
        const bugScreenshot = interaction.options.getAttachment("bug-screenshot");

        const bugEmbed = new EmbedBuilder()
            .setColor('#AB561C')
            .setTitle("BUG REPORT")
            .setDescription("Please describe the bug / issue below and provide a screenshot:")
            .setImage(bugScreenshot.attachment)
            .addFields(
                {
                    name: bugTitle,
                    value: bugDescription,
                    inline: true,
                },
            )

        const message = await interaction.reply({
            embeds: [bugEmbed],
            content: `<@309178896366960640>`,
            fetchReply: true,
        });
    }
};
