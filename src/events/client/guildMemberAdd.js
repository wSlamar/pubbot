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
        const welcome2 = `Shiver me timbers! It be <@${member.id}>! Welcome aboard!`
        const welcome3 = `Avast! It be <@${member.id}>! Welcome to the crew!`
        const welcome4 = `Yar! It be <@${member.id}>! Welcome to the Local Island!`
        const welcome5 = `Yo-ho-ho! It be <@${member.id}>! Welcome to the crew!`
        const welcome6 = `Avast! Thar blows <@${member.id}>! Welcome aboard!`
        const welcome7 = `Avast! It be the scallywag, <@${member.id}>! Welcome to the crew!`
        const welcome8 = `Arg! It be <@${member.id}>! Welcome to the Local Island!`
        const welcome9 = `Yar! It be the landlubber, <@${member.id}>! Welcome to the crew!`
        const welcome10 = `Arg! It be the bilge rat, <@${member.id}>! Welcome aboard!`
        const welcome11 = `Avast! It be the scurvy dog, <@${member.id}>! Welcome to the crew!`
        const welcome12 = `Welcome aboard <@${member.id}>! Prepare to set sail!`
        const welcome13 = `Ahoy, <@${member.id}>! Ye found safe harbor with us!`
        const welcome14 = `Hark! A new pirate be among us! Welcome <@${member.id}>!`
        const welcome15 = `Prepare to be boarded! <@${member.id}> be joining our ranks!`
        const welcome16 = `Avast ye! <@${member.id}> has landed at the Local Island!`
        const welcome17 = `Blimey! <@${member.id}> has washed ashore! Welcome to the crew!`
        const welcome18 = `Ahoy, matey! <@${member.id}> has joined our pirate ranks!`
        const welcome19 = `Yo-ho-ho! <@${member.id}> has found our hidden treasure! Welcome aboard!`
        const welcome20 = `Arrr! <@${member.id}> has set sail with us! Welcome to the crew!`
        const welcome21 = `Shiver me timbers! <@${member.id}> has joined our pirate band!`
        const welcome22 = `Ahoy there! <@${member.id}> has come aboard! Prepare for adventure!`
        const welcome23 = `Welcome, <@${member.id}>! May the wind be ever in your sails!`
        const welcome24 = `Ahoy, <@${member.id}>! Ready yer sea legs and join the crew!`
        const welcome25 = `Arrr! <@${member.id}> has found our pirate hideout! Welcome!`
        const welcome26 = `Ahoy, <@${member.id}>! Ye be a pirate now! Welcome aboard!`
        const welcome27 = `Blimey! <@${member.id}> has joined our swashbuckling crew!`
        const welcome28 = `Ahoy, <@${member.id}>! Ye be a true pirate now! Welcome!`
        const welcome29 = `Arrr! <@${member.id}> has joined our merry band of pirates!`
        const welcome30 = `Ahoy, <@${member.id}>! Ye be a pirate among pirates! Welcome!`

        const welcomeArray = [
            welcome1, welcome2, welcome3, welcome4, welcome5, welcome6, welcome7, welcome8, welcome9, welcome10, 
            welcome11, welcome12, welcome13, welcome14, welcome15, welcome16, welcome17, welcome18, welcome19, welcome20, 
            welcome21, welcome22, welcome23, welcome24, welcome25, welcome26, welcome27, welcome28, welcome29, welcome30
          ];

        function randomMessage(welcomeArray) {
            return welcomeArray[Math.floor(Math.random() * welcomeArray.length)];
        }

        // const welcomeEmbed = new EmbedBuilder()
        //     .setColor('#ff7ee2')
        //     .setImage('https://i.imgur.com/xLj4foJ.png')
        //     .addFields(
        //         {
        //             name: `💀  WELCOME TO THE LOCAL ISLAND  💀`,
        //             value: `Ahoy and welcome to the Local Island sailor! We be hopin' ye enjoy yer stay with us and partake in our daily custom game events. All members be encouraged to join us on our adventures and claim a share of the treasure. Join our crew, explore the island, and embark on epic adventures across the seven seas!`,
        //         },
        //     )

        const channel = client.channels.cache.get(welcomeChannel);
        let welcomeMessage = await channel.send({
            content: `${randomMessage(welcomeArray)}`,
            // embeds: [welcomeEmbed],
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
