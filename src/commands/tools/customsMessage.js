const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { aramEmoji } = process.env;
const { customAramEmoji } = process.env;
const { riftEmoji } = process.env;
const { customRiftEmoji } = process.env;
const { tftEmoji } = process.env;
const { aramRulesChannel } = process.env;
const { riftRulesChannel } = process.env;
const { tftRulesChannel } = process.env;
const { barKeepsRole } = process.env;
const { barOwnerRole } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-customs")
        .setDescription("Return an embed with information about the channel and rules for customs")
        .addStringOption((option) => option
            .setName("customs-mode")
            .setDescription("customs mode message that will be sent")
            .setRequired(true)
            .addChoices(
                { name: 'ARAM', value: 'ARAM' },
                { name: 'Summoners Rift', value: 'Summoners Rift' },
                { name: 'TFT', value: 'TFT' },
            )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        console.log('\x1b[36m', '/pub-customs has been kicked off', '\x1b[0m')
        const customsMode = interaction.options.getString("customs-mode");

        const aram = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/aDVseTe.png')
            .setTitle(`${aramEmoji}  THE LOCAL PUB'S CUSTOM ARAM EVENTS  ${aramEmoji}`)
            .setDescription(`This channels purpose is to kick off Custom ARAM events that will be hosted by our <@&${barKeepsRole}> or <@&${barOwnerRole}>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: `${aramEmoji}  JOINING THE EVENT  ${aramEmoji}`,
                    value: `When an event is kicked off, simply click on the corresponding team emoji for which team you would like to join. These events are first come first serve so make sure to reserve your spot when the event is kicked off! \n‎`,
                },
                {
                    name: `${aramEmoji}  REMOVING YOURSELF FROM THE EVENT  ${aramEmoji}`,
                    value: `If you signed up to be on a team for the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: `${aramEmoji}  RULES  ${aramEmoji}`,
                    value: `Before joining the event, make sure to check out our event rules in the <#${aramRulesChannel}> thread. Any rules that are not followed are punishable by moderators discretion.`
                },
            )

        const summonersRift = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/2MaIHMp.png')
            .setTitle(`${riftEmoji}  THE LOCAL PUB'S CUSTOM RIFT EVENTS  ${riftEmoji}`)
            .setDescription(`This channels purpose is to kick off Custom Summoners Rift events that will be hosted by our <@&${barKeepsRole}> or <@&${barOwnerRole}>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: `${riftEmoji}  JOINING THE EVENT  ${riftEmoji}`,
                    value: `When an event is kicked off, simply click on the corresponding team emoji for which team you would like to join. These events are first come first serve so make sure to reserve your spot when the event is kicked off! \n‎`,
                },
                {
                    name: `${riftEmoji}  REMOVING YOURSELF FROM THE EVENT  ${riftEmoji}`,
                    value: `If you signed up to be on a team for the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: `${riftEmoji}  RULES  ${riftEmoji}`,
                    value: `Before joining the event, make sure to check out our event rules in the <#${riftRulesChannel}> thread. Any rules that are not followed are punishable by moderators discretion.`
                },
            )

        const tft = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/iZD4ihw.png')
            .setTitle(`${tftEmoji}  THE LOCAL PUB'S TFT EVENTS  ${tftEmoji}`)
            .setDescription(`This channels purpose is to kick off TFT events that will be hosted by our <@&${barKeepsRole}> or <@&${barOwnerRole}>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: `${tftEmoji}  JOINING THE EVENT  ${tftEmoji}`,
                    value: `When an event is kicked off, simply click on the corresponding player emoji to join the event. These events are first come first serve so make sure to reserve your spot when the event is kicked off! \n‎`,
                },
                {
                    name: `${tftEmoji}  REMOVING YOURSELF FROM THE EVENT  ${tftEmoji}`,
                    value: `If you signed up to participate in the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: `${tftEmoji}  RULES  ${tftEmoji}`,
                    value: `Before joining the event, make sure to check out our event rules in the <#${tftRulesChannel}> thread. Any rules that are not followed are punishable by moderators discretion.`
                },
            )

        let channelComannd = client.channels.cache.get(interaction.channelId);

        const replyMessage = await interaction.reply({
            content: "/pub-customs has been kicked off",
            ephemeral: true
        });

        if (customsMode == 'ARAM') {
            const message = await channelComannd.send({
                embeds: [aram],
            });
        }
        if (customsMode == 'Summoners Rift') {
            const message = await channelComannd.send({
                embeds: [summonersRift],
            });
        }
        if (customsMode == 'TFT') {
            const message = await channelComannd.send({
                embeds: [tft],
            });
        }
    }
};