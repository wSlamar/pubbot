const { EmbedBuilder } = require("discord.js");

module.exports = Object.freeze({
    customsEmbed: new EmbedBuilder()
        .setColor('#AB561C')
        .setTitle('TITLE OF THE EVENT')
        .setDescription(`00:00 PM on 00/00/0000`)
        .setFooter({ text: `To be removed from a team, or change teams, react with ❌ to this message.\nThis event will start in 0 days, 0 hours, 0 minutes, and 0 seconds` })
        .addFields(
            {
                name: "CLICK A TEAM EMOJI BELOW TO JOIN A TEAM",
                value: `Description of the event that will be taking place.`,
            },
            {
                name: "🔵 TEAM 1 🔵",
                value:
                    "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                inline: true,
            },
            {
                name: "🔴 TEAM 2 🔴",
                value:
                    "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                inline: true,
            }
        ),
    formatEmbed: new EmbedBuilder()
        .setColor('#AB561C')
        .setTitle('INCORRECT FORMAT ERROR')
        .setDescription(`Looks like you didn't enter in one of the parameters in the correct format. With the dates and time, the best rule of the thumb to follow is:\n\n **IF THERE IS A SINGLE DIGIT, 0 MUST COME BEFORE IT.**\n\n Below are some examples of how you should format the parameters:`)
        .addFields(
            {
                name: "[event-month]",
                value: `*11* **OR** *07*`,
            },
            {
                name: "[event-day]",
                value: `*21* **OR** *09*`,
            },
            {
                name: "[event-year]",
                value: `*2022* **OR** *2023*`,
            },
            {
                name: "[event-time]",
                value: `*12:30 PM* **OR** *07:05 AM*`,
            },
        )
});