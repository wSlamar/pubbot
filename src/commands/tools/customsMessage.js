const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

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
            .setThumbnail('https://i.imgur.com/6ZfWcjq.png')
            .setTitle("<:customARAM1:1061407793552306296>  THE LOCAL PUB'S CUSTOM ARAM EVENTS  <:customARAM1:1061407793552306296>")
            .setDescription(`This channels purpose is to kick off Custom ARAM events that will be hosted by our <@&1059638173262676078> or <@&1059638175649235075>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: "<:customARAM1:1061407793552306296>  JOINING THE EVENT  <:customARAM1:1061407793552306296>",
                    value: `When an event is kicked off, simply click on the corresponding team emoji for which team you would like to join. These events are first come first serve so make sure to reserve your spot when the event is kicked off! \n‎`,
                },
                {
                    name: "<:customARAM1:1061407793552306296>  REMOVING YOURSELF FROM THE EVENT  <:customARAM1:1061407793552306296>",
                    value: `If you signed up to be on a team for the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: "<:customARAM1:1061407793552306296>  RULES  <:customARAM1:1061407793552306296>",
                    value: `Before joining the event, make sure to check out our event rules in the <#1059638278116098118> channel. Any rules that are not followed are punishable by moderators discretion.`
                },
            )

        const summonersRift = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/E1FruW1.png')
            .setTitle("<:customRift1:1061407796211490916>  THE LOCAL PUB'S CUSTOM RIFT EVENTS  <:customRift1:1061407796211490916>")
            .setDescription(`This channels purpose is to kick off Custom Summoners Rift events that will be hosted by our <@&1059638173262676078> or <@&1059638175649235075>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: "<:customRift1:1061407796211490916>  JOINING THE EVENT  <:customRift1:1061407796211490916>",
                    value: `When an event is kicked off, simply click on the corresponding team emoji for which team you would like to join. These events are first come first serve so make sure to reserve your spot when the event is kicked off! \n‎`,
                },
                {
                    name: "<:customRift1:1061407796211490916>  REMOVING YOURSELF FROM THE EVENT  <:customRift1:1061407796211490916>",
                    value: `If you signed up to be on a team for the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: "<:customRift1:1061407796211490916>  RULES  <:customRift1:1061407796211490916>",
                    value: `Before joining the event, make sure to check out our event rules in the <#1059638278116098118> channel. Any rules that are not followed are punishable by moderators discretion.`
                },
            )

        const tft = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/3I4v0tV.png')
            .setTitle("<:TFT1:1061407824233644154>v  THE LOCAL PUB'S TFT EVENTS  <:TFT1:1061407824233644154>v")
            .setDescription(`This channels purpose is to kick off TFT events that will be hosted by our <@&1059638173262676078> or <@&1059638175649235075>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: "<:TFT1:1061407824233644154>v  JOINING THE EVENT  <:TFT1:1061407824233644154>v",
                    value: `When an event is kicked off, simply click on the corresponding team emoji for which team you would like to join. These events are first come first serve so make sure to reserve your spot when the event is kicked off! \n‎`,
                },
                {
                    name: "<:TFT1:1061407824233644154>v  REMOVING YOURSELF FROM THE EVENT  <:TFT1:1061407824233644154>v",
                    value: `If you signed up to be on a team for the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: "<:TFT1:1061407824233644154>v  RULES  <:TFT1:1061407824233644154>v",
                    value: `Before joining the event, make sure to check out our event rules in the <#1059638278116098118> channel. Any rules that are not followed are punishable by moderators discretion.`
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