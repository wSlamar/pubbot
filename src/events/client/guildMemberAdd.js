const { welcomeChannel } = process.env;
const { rulesChannel } = process.env;
const { rolesChannel } = process.env;
const moment = require("moment");
const momentTZ = require("moment-timezone");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const welcome1 = `Ahoy me hearties! <@${member.id}> has just joined our crew!`
        const welcome2 = `Shiver me timbers! It be <@${member.id}>!`
        const welcome3 = `Avast! It be <@${member.id}>!`
        const welcome4 = `Yar! It be <@${member.id}>!`
        const welcome5 = `Yo-ho-ho! It be <@${member.id}>!`
        const welcome6 = `Avast! Thar blows <@${member.id}>!`
        const welcome7 = `Avast! It be the scallywag, <@${member.id}>!`
        const welcome8 = `Arg! It be <@${member.id}>!`
        const welcome9 = `Yar! It be the landlubber, <@${member.id}>!`
        const welcome10 = `Arg! It be the bilge rat, <@${member.id}>!`
        const welcome11 = `Avast! It be the scurvy dog, <@${member.id}>!`
        const welcome12 = `Welcome aboard <@${member.id}>! Prepare to set sail!`
        const welcome13 = `Ahoy, <@${member.id}>! Ye found safe harbor with us!`
        const welcome14 = `Hark! A new pirate be among us! Welcome <@${member.id}>!`
        const welcome15 = `Prepare to be boarded! <@${member.id}> be joining our ranks!`
        const welcome16 = `Avast ye! <@${member.id}> has landed!`

        const welcomeArray = [welcome1, welcome2, welcome3, welcome4, welcome5, welcome6, welcome7, welcome8, welcome9, welcome10, welcome11, welcome12, welcome13, welcome14, welcome15, welcome16]

        function randomMessage(welcomeArray) {
            return welcomeArray[Math.floor(Math.random() * welcomeArray.length)];
        }

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#ff7ee2')
            .setImage('https://i.imgur.com/xLj4foJ.png')
            .addFields(
                {
                    name: `💀  WELCOME TO THE LOCAL ISLAND  💀`,
                    value: `Ahoy and welcome to the Local Island sailor! We be hopin' ye enjoy yer stay with us and partake in our daily custom game events. All members be encouraged to join us on our adventures and claim a share of the treasure. Join our crew, explore the island, and embark on epic adventures across the seven seas!`,
                },
            )

        const channel = client.channels.cache.get(welcomeChannel);
        let welcomeMessage = await channel.send({
            content: `${randomMessage(welcomeArray)}`,
            embeds: [welcomeEmbed],
        })

        welcomeMessage.react('💀').catch(error => {
            if (error.code !== 10008) {
                console.error('Error on welcome emoji:', error);
            }
        })

        let estDateLog = new Date()
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
        }

        console.log('\x1b[33m', `Kraken has welcomed [${member.user.username}#${member.user.discriminator}] to the server at [${convertTZ(estDateLog, 'America/New_York').toLocaleString()}]`, '\x1b[0m')
    }
}
