const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const moment = require("moment");
let zeroTimeStamp;
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
        const message = await interaction.reply({
            content: `Days: 0 Hours: 0 - Mintues: 0 - Seconds: 0`,
            fetchReply: true
        });

        if(zeroTimeStamp == undefined || zeroTimeStamp == '0, 0, 0, 0') {
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
                    console.log("Unfortunately we have past the event day");
                    clearInterval(interval);
                    return;
                } else if (timeSpan <= 0) {
                    console.log("Today is the event day");
                    clearInterval(interval);
                    return;
                } else {
                    const days = Math.floor(timeSpan / day);
                    const hours = Math.floor((timeSpan % day) / hour);
                    const minutes = Math.floor((timeSpan % hour) / minute);
                    const seconds = Math.floor((timeSpan % minute) / second);
    
                    message.edit({
                        content: `Days: ${days} Hours: ${hours} - Mintues: ${minutes} - Seconds: ${seconds}`
                    })
                    zeroTimeStamp = `${days}, ${hours}, ${minutes}, ${seconds}`
                }
            };
    
            interval = setInterval(countDownFn, second);

        } else {
            interaction.followUp({
                content: `There is already an iteration of this event currently happening. You must wait until the current event is over to use this command again. You may use this command again on **${eventMonth}/${eventDay}/${eventYear}** at **${time}**.`,
                ephemeral: true
            })
            message.delete();
        }
    }

};