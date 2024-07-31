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
const { beerNutRole } = process.env;
const { bartenderRole } = process.env;

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
                // { name: 'Summoners Rift', value: 'Summoners Rift' },
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
            .setTitle(`${aramEmoji}  THE LOCAL PUB'S CUSTOM ARAM LOBBIES  ${aramEmoji}`)
            .setDescription(`This channels purpose is to kick off Custom ARAM lobbies that will be hosted by our <@&${barKeepsRole}>, <@&${barOwnerRole}>, <@&${bartenderRole}>, or <@&${beerNutRole}>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: `${aramEmoji}  JOINING THE LOBBY  ${aramEmoji}`,
                    value: `When a lobby is kicked off, simply click on the corresponding team emoji for which team you would like to join. \n‎`,
                },
                {
                    name: `${aramEmoji}  REMOVING YOURSELF  ${aramEmoji}`,
                    value: `If you want to change teams or remove yourself from the lobby, react to the event with the ❌ emoji to do this. \n‎`
                },
                {
                    name: `${aramEmoji}  RULES  ${aramEmoji}`,
                    value: `Before joining the lobby, make sure to check out our Custom ARAM rules in the <#${aramRulesChannel}> channel. \n‎`
                },
                {
                    name: `${aramEmoji}  BE ON TIME  ${aramEmoji}`,
                    value: `We will allow a 5 minute window for players who sign up for the Custom lobby. Do not be late or your spot will be filled!\n‎`
                },
                {
                    name: `${aramEmoji}  PRIORITIZATION  ${aramEmoji}`,
                    value: `Members who sign up for the lobby get prioritization over members who do not so make sure to sign up when the lobby is kicked off! These spots are first come first serve!`
                },
            )

        // const summonersRift = new EmbedBuilder()
        //     .setColor('#167301')
        //     .setThumbnail('https://i.imgur.com/2MaIHMp.png')
        //     .setTitle(`${riftEmoji}  THE LOCAL PUB'S CUSTOM RIFT LOBBIES  ${riftEmoji}`)
        //     .setDescription(`This channels purpose is to kick off Custom Summoners Rift lobbies that will be hosted by our <@&${barKeepsRole}>, <@&${barOwnerRole}>, <@&${bartenderRole}>, or <@&${beerNutRole}>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
        //     .addFields(
        //         {
        //             name: `${riftEmoji}  JOINING THE LOBBY  ${riftEmoji}`,
        //             value: `When a lobby is kicked off, simply click on the corresponding team emoji for which team you would like to join. You can also select your position for the lobby by clicking on the corresponding position emoji underneath of the sign up post. \n‎`,
        //         },
        //         {
        //             name: `${riftEmoji}  REMOVING YOURSELF  ${riftEmoji}`,
        //             value: `If you want to change teams or remove yourself from the lobby, react to the event with the ❌ emoji to do this. \n‎`
        //         },
        //         {
        //             name: `${riftEmoji}  RULES  ${riftEmoji}`,
        //             value: `Before joining the lobby, make sure to check out our Custom Rift rules in the <#${riftRulesChannel}> channel. \n‎`
        //         },
        //         {
        //             name: `${riftEmoji}  BE ON TIME  ${riftEmoji}`,
        //             value: `We will allow a 5 minute window for players who sign up for the Custom lobby. Do not be late or your spot will be filled!\n‎`
        //         },
        //         {
        //             name: `${riftEmoji}  PRIORITIZATION  ${riftEmoji}`,
        //             value: `Members who sign up for the custom event get prioritization over members who do not so make sure to sign up when the lobby is kicked off! These spots are first come first serve!`
        //         },
        //     )

        const tft = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/iZD4ihw.png')
            .setTitle(`${tftEmoji}  THE LOCAL PUB'S TFT EVENTS  ${tftEmoji}`)
            .setDescription(`This channels purpose is to kick off TFT events that will be hosted by our <@&${barKeepsRole}>, <@&${barOwnerRole}>, <@&${bartenderRole}>, or <@&${beerNutRole}>. We welcome everyone to join us for some fun and encourage everyone to participate! \n‎`)
            .addFields(
                {
                    name: `${tftEmoji}  JOINING THE EVENT  ${tftEmoji}`,
                    value: `When an event is kicked off, simply click on the corresponding player emoji to join the event. \n‎`,
                },
                {
                    name: `${tftEmoji}  REMOVING YOURSELF FROM THE EVENT  ${tftEmoji}`,
                    value: `If you signed up to participate in the event and cannot make it, make sure to react to the event with the ❌ emoji to remove yourself. We want everyone to be able to participate in our events and blocking someone from joining is not fun for anyone. \n‎`
                },
                {
                    name: `${tftEmoji}  RULES  ${tftEmoji}`,
                    value: `Before joining the event, make sure to check out our event rules in the <#${tftRulesChannel}> channel. Any rules that are not followed are punishable by moderators discretion. \n‎`
                },
                {
                    name: `${tftEmoji}  PRIORITIZATION  ${tftEmoji}`,
                    value: `Members who sign up for the custom event get prioritization over members who do not so make sure to sign up when the event is kicked off! These spots are first come first serve!`
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
        // if (customsMode == 'Summoners Rift') {
        //     const message = await channelComannd.send({
        //         embeds: [summonersRift],
        //     });
        // }
        if (customsMode == 'TFT') {
            const message = await channelComannd.send({
                embeds: [tft],
            });
        }
    }
};