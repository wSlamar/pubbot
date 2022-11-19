const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const getAPIValues = require('../../events/client/api.js')
const embeds = require('../../events/client/embeds.js')
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-calendar")
        .setDescription("Return thy calendar")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog),
    async execute(interaction, client) {

        const message = await interaction.reply({
            embeds: [embeds.customsEmbed],
            fetchReply: true,
        });

        getAPIValues().then(({ title, who, description, startdate }) => {
            let scrubedDescription;
            if (description.includes("<p>")) {
                let unscrubbed = description.replace("<p>", "")
                scrubedDescription = unscrubbed.replace("</p>", "")
            }
            const customsEmbed = new EmbedBuilder()
                .setColor('#AB561C')
                .setTitle(title)
                .setDescription(startdate)
                .setFooter({ text: `To be removed from a team, or change teams, react with ❌ to this message.\nThis event will start in 0 days, 0 hours, 0 minutes, and 0 seconds` })
                .addFields(
                    {
                        name: "CLICK A TEAM EMOJI BELOW TO JOIN A TEAM",
                        value: scrubedDescription,
                    },
                    {
                        name: "🔵 TEAM 1 🔵",
                        value: "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                        inline: true,
                    },
                    {
                        name: "🔴 TEAM 2 🔴",
                        value: "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                        inline: true,
                    }
                );
            message.edit({ embeds: [customsEmbed], content: who, }).catch(error => {
                if (error.code !== 10008) { console.error('Error on message edit:', error); }
            });
        }).catch(console.error);
    }
};