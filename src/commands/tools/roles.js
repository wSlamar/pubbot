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
            .setFooter({text: "❗❗❗❗ MAKE SURE TO REACT TO OUR RULES TO GAIN ACCESS TO THE PUB ❗❗❗❗"})
            .setDescription(`Welcome to The Local Pub! Please react to receive the corresponding role! These roles will give you access to the rest of the server.\n‎`)
            .addFields(
                {
                    name: "<:ARAM:1059647165628153999>  ARAM  <:ARAM:1059647165628153999>",
                    value: `Gives access to ARAM related channels.\n‎`,
                },
                {
                    name: "<:summonersRift:1059647173526032504>  Summoners Rift  <:summonersRift:1059647173526032504>",
                    value: `Gives access to Summoners Rift related channels.\n‎`,
                },
                {
                    name: "<:TFT:1059647175388319815>  TFT  <:TFT:1059647175388319815>",
                    value: `Gives access to TFT related channels.\n‎`,
                },
                {
                    name: "<:customARAM:1059650622334435398>  Custom ARAM  <:customARAM:1059650622334435398>",
                    value: `Gives access to ARAM related channels **AND** will also grant you the ability to be pinged when custom ARAM events are started.\n‎`,
                },
                {
                    name: "<:customRift:1059650624171544607>  Custom Summoners Rift  <:customRift:1059650624171544607>",
                    value: `Gives access to Summoners Rift related channels **AND** will also grant you the ability to be pinged when custom Summoners Rift events are started.\n‎`,
                },
                {
                    name: "<:customTFT:1059650626352590898>  Custom TFT  <:customTFT:1059650626352590898>",
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
