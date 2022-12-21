const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
let eventMonth;
let eventDay;
let eventYear;
let time;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-timer")
        .setDescription("Timer testing command")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
        .addIntegerOption((option) => option
            .setName("event-month")
            .setDescription("month of the event")
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName("event-day")
            .setDescription("day of the event")
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName("event-year")
            .setDescription("year of the event")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("event-time")
            .setDescription("time of the event")
            .setRequired(true)
        ),

    async execute(interaction, client) {

        const timeEmbed = new EmbedBuilder()
            .setTitle('TITLE OF THE EVENT')
            .setDescription(`Event Description`)
            .setFooter({text: `Days: 0 - Hours: 0 - Mintues: 0`})

        const message = await interaction.reply({
            embeds: [timeEmbed],
            fetchReply: true
        });

        eventMonth = interaction.options.getInteger("event-month").toString();
        eventDay = interaction.options.getInteger("event-day").toString();
        eventYear = interaction.options.getInteger("event-year").toString();
        time = interaction.options.getString("event-time");

        const convertTime12to24 = (time12h) => {
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') {
                hours = '00';
            }
            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}:${minutes}`;
        }

        const timeMilitary = `${convertTime12to24(time)}:00`

        let interval;
        const eventDayMoment = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`);

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const countDownFn = () => {
            const today = moment();
            const timeSpan = eventDayMoment.diff(today);

            if (timeSpan <= -today) {
                console.log("Past the event day");
                clearInterval(interval);
                return;
            } else if (timeSpan <= 0) {
                console.log("Today is the day of the event");
                clearInterval(interval);
                return;
            } else {
                const days = Math.floor(timeSpan / day);
                const hours = Math.floor((timeSpan % day) / hour);
                const minutes = Math.floor((timeSpan % hour) / minute);
                const seconds = Math.floor((timeSpan % minute) / second);

                message.edit({
                    embeds: [timeEmbed.setFooter({text: `Days: ${days} - Hours: ${hours} - Mintues: ${minutes} - Seconds: ${seconds}`})],
                })
                zeroTimeStamp = `${days}, ${hours}, ${minutes}, ${seconds}`
            }
        };
        interval = setInterval(countDownFn, 3000);
    }
};