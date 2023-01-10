const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-roles")
        .setDescription("Return an embed for users to react to in order to get their role")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        console.log('\x1b[36m','/pub-roles has been kicked off','\x1b[0m')
        const roles = new EmbedBuilder()
            .setColor('#167301')
            .setTitle('THE LOCAL PUB ROLES')
            .setFooter({text: "❗❗❗ READ AND REACT TO OUR RULES TO GAIN MORE ACCESS TO THE CHANNELS ❗❗❗"})
            .setDescription(`Welcome to The Local Pub! Please react to receive the corresponding role! These roles will give you access to the rest of the server.\n‎`)
            .addFields(
                {
                    name: "<:ARAM1:1061407791874572358>  ARAM  <:ARAM1:1061407791874572358>",
                    value: `Gives access to ARAM related channels.\n‎`,
                },
                {
                    name: "<:summonersRift1:1061407821620576286>  Summoners Rift  <:summonersRift1:1061407821620576286>",
                    value: `Gives access to Summoners Rift related channels.\n‎`,
                },
                {
                    name: "<:TFT1:1061407824233644154>  TFT  <:TFT1:1061407824233644154>",
                    value: `Gives access to TFT related channels.\n‎`,
                },
                {
                    name: "<:customARAM1:1061407793552306296>  Custom ARAM  <:customARAM1:1061407793552306296>",
                    value: `Gives access to ARAM related channels **AND** will also grant you the ability to be pinged when custom ARAM events are started.\n‎`,
                },
                {
                    name: "<:customRift1:1061407796211490916>  Custom Summoners Rift  <:customRift1:1061407796211490916>",
                    value: `Gives access to Summoners Rift related channels **AND** will also grant you the ability to be pinged when custom Summoners Rift events are started.\n‎`,
                },
                {
                    name: "<:customTFT1:1061407798577082459>  Custom TFT  <:customTFT1:1061407798577082459>",
                    value: `Gives access to TFT related channels **AND** will also grant you the ability to be pinged when custom TFT events are started.\n‎`,
                },
                {
                    name: ":video_game: Other Games :video_game:",
                    value: `Gives access to other games related channels.\n‎`,
                },
            )

        const message = await interaction.reply({
            embeds: [roles],
        })
    }
};
