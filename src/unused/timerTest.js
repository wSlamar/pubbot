const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const embeds = require("../events/client/embeds");

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

    timerEmbed: new EmbedBuilder()
        .setTitle(`<t:1672279999:R>`)
        .setDescription(`<t:1672279999:R>`)
        .setFooter({ text: `<t:1672279999:R>` })
        .addFields(
            {
                name: `<t:1672279999:R>`,
                value: `<t:1672279999:R>`,
            }),
        // .setTimestamp(1672279999),

    async execute(interaction, client) {
        const message = await interaction.reply({
            content: `Test <t:1672279999:R>`,
            embeds: [this.timerEmbed],
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

        const timeConverted = `${convertTime12to24(time)}:00`

        let interval;
        const eventDayMoment = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeConverted}`);
        const eventDayMoment2 = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeConverted}`).unix();
        console.log(eventDayMoment2)

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

                // message.edit({
                //     embeds: [this.timerEmbed.setFooter({ text: `This event will start in ${days} days, ${hours} hours, ${minutes} mintues and ${seconds} seconds` })]
                // })
            }
        };

        interval = setInterval(countDownFn, second);
    }
};