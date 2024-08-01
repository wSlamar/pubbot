const { mojitoChannelsArray } = process.env;
const { leagueCategoryEnv } = process.env;
const { gamesCategoryEnv } = process.env;
const { leagueRole } = process.env;
const { localGamesRole } = process.env;
const { CronJob } = require('cron');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! ${client.user.tag} is logged in and online.`);

        async function cleanupTask() {
            let estDateLog = new Date()
            function convertTZ(date, tzString) {
                return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
            }
            console.log('\x1b[36m', `cleanup cron job executing at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')
            
            const leagueCategory = client.channels.cache.get(leagueCategoryEnv);
            const leagueChildrenIds = leagueCategory.children.cache.map(c => c.id);
            const gamesCategory = client.channels.cache.get(gamesCategoryEnv);
            const gamesChildrenIds = gamesCategory.children.cache.map(c => c.id);
            const textChannelArray = mojitoChannelsArray.split(",");

            async function cleanupAllTextChannels() {
                for (let i = 0; i < textChannelArray.length; i++) {
                    const channel = client.channels.cache.get(textChannelArray[i]);
                    const allMessages = await channel.messages.fetch();
                    const deletable = allMessages.filter(message => !message.pinned);
                    await channel.bulkDelete(deletable, true);
                }
            }

            async function cleanupLeagueCategory() {
                leagueChildrenIds.forEach(async childId => {
                    const channel = client.channels.cache.get(childId);
                    if (channel.type === 2) { 
                        await channel.setUserLimit(0);
                        await channel.permissionOverwrites.edit(leagueRole, { ViewChannel: false });
                    }
                });
            }

            async function cleanupGamesCategory(ignoreChannelId) {
                gamesChildrenIds.forEach(async childId => {
                    const channel = client.channels.cache.get(childId);
                    if (channel.type === 2) { 
                        if (channel.id === ignoreChannelId) {
                            return;
                        }
                        await channel.setUserLimit(0);
                        await channel.permissionOverwrites.edit(localGamesRole, { ViewChannel: false });
                    }
                });
            }

            await cleanupAllTextChannels();
            await cleanupLeagueCategory();
            await cleanupGamesCategory('1268351558341361728');
        }

        const job = new CronJob('30 5 * * *', async () => {
            await cleanupTask();
        }, null, true, 'America/New_York');
        
        job.start();
    }
};

// module.exports = {
//     name: 'ready',
//     once: true,
//     async execute(client) {
//         console.log(`Ready! ${client.user.tag} is logged in and online.`)
//     }
// }