const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const getAPIValues = require('./api.js')
const embeds = require('../events/client/embeds.js')
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminChannel } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-calendar")
        .setDescription("Return thy calendar")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog),
    async execute(interaction, client) {

        getAPIValues().then(async ({ firstButton, firstTitle, secondTitle, thirdTitle, fourthTitle, fifthTitle, firstWho, secondWho, thirdWho, forthWho, fifthWho, firstDescription, secondDescription, thirdDescription, forthDescription, fifthDescription, firstStartDate, secondStartDate, thirdStartDate, forthStartDate, fifthStartDate }) => {

            const eventButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('firstEvent')
                        .setLabel(firstButton)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('secondEvent')
                        .setLabel(secondTitle)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('thirdEvent')
                        .setLabel(thirdTitle)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('fourthEvent')
                        .setLabel(fourthTitle)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('fifthEvent')
                        .setLabel(fifthTitle)
                        .setStyle(ButtonStyle.Primary),
                );
            const buttonMessage = await interaction.reply({
                content: `What event would you like to kick off?`,
                components: [eventButtons],
            })

            const buttonCollector = buttonMessage.createMessageComponentCollector({ componentType: ComponentType.Button });

            async function refreshEmbeded(message, title, who, description, startDate) {
                const localDate = new Date(startDate).toLocaleString();
                const dateArray = localDate.split(",")
                const dateStandard = dateArray[0];

                const dateTimeArray = startDate.split("T")
                const dateISO = dateTimeArray[0];
                const timeISO = dateTimeArray[1];
                const timeISOFixed = dateTimeArray[1].slice(0, -6)

                function convert(input) {
                    return moment(input, 'HH:mm:ss').format('h:mm:ss A');
                }

                const convertToStandard = convert(timeISOFixed);
                const secondsParse1 = convertToStandard.slice(0, 6) + convertToStandard.slice(7);
                const secondsParse2 = secondsParse1.slice(0, 5) + secondsParse1.slice(6);
                const noSecondsTimeFinal = secondsParse2.slice(0, 4) + secondsParse2.slice(5);

                let scrubedDescription;
                if (description.includes("<p>")) {
                    let unscrubbed = description.replace("<p>", "")
                    scrubedDescription = unscrubbed.replace("</p>", "")
                }

                const customsEmbed = new EmbedBuilder()
                    .setColor('#AB561C')
                    .setTitle(title)
                    .setDescription(`${noSecondsTimeFinal} on ${dateStandard}`)
                    .setFooter({ text: `To be removed from a team, or change teams, react with ❌ to this message.\nThis event will start in 0 days, 0 hours, 0 minutes, and 0 seconds` })
                    .addFields(
                        {
                            name: "CLICK A TEAM EMOJI BELOW TO JOIN A TEAM",
                            value: scrubedDescription,
                        },
                        {
                            name: "🔵 TEAM 1 🔵",
                            value: "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                            inline: true,
                        },
                        {
                            name: "🔴 TEAM 2 🔴",
                            value: "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
                            inline: true,
                        }
                    );
                message.edit({ embeds: [customsEmbed], content: who }).catch(error => {
                    if (error.code !== 10008) { console.error('Error on message edit:', error); }
                });
            }

            buttonCollector.on('collect', async m => {
                let message;
                switch (m.customId) {
                    case 'firstEvent':
                        interaction.deleteReply()
                        message = await m.reply({
                            embeds: [embeds.customsEmbed],
                            fetchReply: true,
                        })
                        refreshEmbeded(message, firstTitle, firstWho, firstDescription, firstStartDate)
                        break;
                    case 'secondEvent':
                        interaction.deleteReply()
                        message = await m.reply({
                            embeds: [embeds.customsEmbed],
                            fetchReply: true,
                        })
                        refreshEmbeded(message, secondTitle, secondWho, secondDescription, secondStartDate)
                        break;
                    case 'thirdEvent':
                        interaction.deleteReply()
                        message = await m.reply({
                            embeds: [embeds.customsEmbed],
                            fetchReply: true,
                        })
                        refreshEmbeded(message, thirdTitle, thirdWho, thirdDescription, thirdStartDate)
                        break;
                    case 'fourthEvent':
                        interaction.deleteReply()
                        message = await m.reply({
                            embeds: [embeds.customsEmbed],
                            fetchReply: true,
                        })
                        refreshEmbeded(message, fourthTitle, forthWho, forthDescription, forthStartDate)
                        break;
                    case 'fifthEvent':
                        interaction.deleteReply()
                        message = await m.reply({
                            embeds: [embeds.customsEmbed],
                            fetchReply: true,
                        })
                        refreshEmbeded(message, fifthTitle, fifthWho, fifthDescription, fifthStartDate)
                        break;
                    default:
                        break;
                }
            });

            buttonCollector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

        }).catch(console.error);
    }
};