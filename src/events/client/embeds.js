const { EmbedBuilder } = require("discord.js");

module.exports = Object.freeze({
    customsEmbed: new EmbedBuilder()
        .setColor('#167301')
        .setTitle('TITLE OF THE EVENT')
        .setDescription(`0:00 PM on 00/00/0000`)
        .setFooter({ text: `To be removed from a team or change teams, react with ❌ to this event.\nThis event will start in 0 days, 0 hours, and 0 minutes` })
        .addFields(
            {
                name: "CLICK A TEAM EMOJI BELOW TO JOIN A TEAM",
                value: `Description of the event that will be taking place.`,
            },
            {
                name: "  TEAM 1  ",
                value:
                    "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                inline: true,
            },
            {
                name: "  TEAM 2  ",
                value:
                    "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                inline: true,
            }
        ),

    formatEmbed: new EmbedBuilder()
        .setColor('#ff7ee2')
        .setTitle('UNKNOWN ERROR')
        .setDescription(`Zoo Wee Mama! Something went wrong and you should not being seeing this error message! Please tell meatbuck if you see this!`),

    customsEmbed2: new EmbedBuilder()
        .setColor('#167301')
        .setTitle('TITLE OF THE EVENT')
        .setDescription(`0:00 PM on 00/00/0000`)
        .setFooter({ text: `To be removed from this event, react with ❌ to this event.\nThis event will start in 0 days, 0 hours, and 0 minutes` })
        .addFields(
            {
                name: "CLICK THE PLAYER EMOJI BELOW TO JOIN US",
                value: `Description of the event that will be taking place.`,
            },
            {
                name: "  PLAYERS  ",
                value:
                    "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]\n[PLAYER 6 OPEN SPOT]\n[PLAYER 7 OPEN SPOT]\n[PLAYER 8 OPEN SPOT]",
                inline: true,
            }
        ),
        
    emojiEmbed: new EmbedBuilder()
        .setColor('#167301')
        .setTitle('UNKNOWN EMOJI ERROR')
        .setURL('https://youneedawiki.com/app/page/1Th5IlY3BP6nHH6hNliqa_xQ7fYxbnI1v')
        .setDescription(`Looks like you tried to enter an emoji that does not have any relation to the server. The emojis that can be used with this command can either be standard emojis or custom emojis that have been uploaded to the server. Click the link above for more information.`)
});