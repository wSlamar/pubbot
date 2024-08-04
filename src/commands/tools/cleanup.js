const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { mojitoChannelsArray } = process.env;
const { leagueCategoryEnv } = process.env;
const { gamesCategoryEnv } = process.env;
const { leagueRole } = process.env;
const { localGamesRole } = process.env;
const { ignoredVoiceChannels } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kraken-cleanup")
        .setDescription("Command for deleting messages in Kraken text channels and changes permissions in voice channels")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        console.log('\x1b[36m', '/kraken-cleanup has been kicked off', '\x1b[0m')
        const leagueCategory = client.channels.cache.get(leagueCategoryEnv);
        const leagueChildrenIds = leagueCategory.children.cache.map(c => c.id);
        const gamesCategory = client.channels.cache.get(gamesCategoryEnv);
        const gamesChildrenIds = gamesCategory.children.cache.map(c => c.id);

        await interaction.deferReply({ ephemeral: true });
        const textChannelArray = mojitoChannelsArray.split(",");

        async function cleanupAllTextChannels() {
            for (var i = 0; i < textChannelArray.length; i++) {
                const channel = client.channels.cache.get(textChannelArray[i]);
                const allMessages = await channel.messages.fetch();
                const deletable = allMessages.filter(message => !message.pinned)
                await channel.bulkDelete(deletable, true)
            }
        }
        
        async function cleanupLeagueCategory(ignored) {
            const ignoreIdsArray = ignored.split(',');
        
            leagueChildrenIds.forEach(async childId => {
                const channel = client.channels.cache.get(childId);
                if (channel.type === 2) { 
                    if (ignoreIdsArray.includes(channel.id)) {
                        return;
                    }
                    await channel.setUserLimit(0);
                    await channel.permissionOverwrites.edit(leagueRole, { ViewChannel: false });
                }
            });
        }

        async function cleanupGamesCategory(ignored) {
            const ignoreIdsArray = ignored.split(',');
        
            gamesChildrenIds.forEach(async childId => {
                const channel = client.channels.cache.get(childId);
                if (channel.type === 2) { 
                    if (ignoreIdsArray.includes(channel.id)) {
                        return;
                    }
                    await channel.setUserLimit(0);
                    await channel.permissionOverwrites.edit(localGamesRole, { ViewChannel: false });
                }
            });
        }

        cleanupAllTextChannels().then(() => cleanupLeagueCategory(ignoredVoiceChannels).then(() => cleanupGamesCategory(ignoredVoiceChannels)));

        const message = await interaction.editReply({
            content: `Successfully deleted messages, locked channels and changed user limits!`,
            ephemeral: true
        })

    }
};
