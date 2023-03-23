const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { mojitoChannelsArray } = process.env;
const { customVoiceChannelsArray } = process.env;
const { verifiedRole } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-cleanup")
        .setDescription("Deletes messages in Mojito text channels and changes connect permissions in customs voice channels")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const textChannelArray = mojitoChannelsArray.split(",");
        async function cleanupTextChannels() {
            for (var i = 0; i < textChannelArray.length; i++) {
                const channel = client.channels.cache.get(textChannelArray[i]);
                const allMessages = await channel.messages.fetch();
                const deletable = allMessages.filter(message => !message.pinned)
                await channel.bulkDelete(deletable, true)
            }
        }
        const voiceChannelArray = customVoiceChannelsArray.split(",");
        async function cleanupVoiceChannels() {
            for (var i = 0; i < voiceChannelArray.length; i++) {
                const channel = client.channels.cache.get(voiceChannelArray[i]);
                channel.permissionOverwrites.edit(verifiedRole, { Connect: false });
            }
        }
        cleanupTextChannels();
        cleanupVoiceChannels()

        const message = await interaction.reply({
            content: `Successfully deleted messages and locked channels!`,
            ephemeral: true
        })

    }
};
