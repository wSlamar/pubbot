const { welcomeChannel } = process.env;
const { rulesChannel } = process.env;
const { rolesChannel } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const welcome1 = `Welcome to The Local Pub <@${member.id}>! 🍻`
        const welcome2 = `Hey there <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome3 = `It's good to see you <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome4 = `Howdy <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome5 = `Hiya <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome6 = `Greetings <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome7 = `Hello <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome8 = `Hey <@${member.id}>! Welcome to The Local Pub! 🍻`
        const welcome9 = `Hi <@${member.id}>! Welcome to The Local Pub! 🍻`

        const welcomeArray = [welcome1, welcome2, welcome3, welcome4, welcome5, welcome6, welcome7, welcome8, welcome9]

        function randomMessage(welcomeArray) {
            return welcomeArray[Math.floor(Math.random() * welcomeArray.length)];
        }

        const channel = client.channels.cache.get(welcomeChannel);
        let welcomeMessage = await channel.send({
            content: `${randomMessage(welcomeArray)}`,
            // content: `${randomMessage(welcomeArray)}\nMake sure that you agree to our <#${rulesChannel}> and then get your server roles in the <#${rolesChannel}> channel!`,
        })
        welcomeMessage.react('🍻').catch(error => {
            if (error.code !== 10008) {
                console.error('Error on welcome emoji:', error);
            }
        })

        let estDateLog = new Date()
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
        }

        console.log('\x1b[33m', `Mojito has welcomed [${member.user.username}#${member.user.discriminator}] to the server at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')
    }
}
