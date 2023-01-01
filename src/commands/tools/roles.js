const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-roles")
        .setDescription("Return an embed for users to react to in order to get their role")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        console.log('\x1b[36m','/pub-roles has been kicked off','\x1b[0m')
        const roles = new EmbedBuilder()
            .setColor('#167301')
            .setTitle('PUB ROLES')
            .setDescription(`Welcome to The Local Pub! Please react to receive the corresponding role!\n‎`)
            .addFields(
                {
                    name: "<:aram:1058233548038996028>  ARAM  <:aram:1058233548038996028>",
                    value: `Gives access to ARAM related channels\n‎`,
                },
                {
                    name: "<:summonersRift:1059164807187677275>  SUMMONERS RIFT  <:summonersRift:1059164807187677275>",
                    value: `Gives access to SUMMONERS RIFT related channels\n‎`,
                },
                {
                    name: "<:loltft:1058233549297287198>  TFT  <:loltft:1058233549297287198>",
                    value: `Gives access to TFT related channels`,
                },
            )

        const message = await interaction.reply({
            embeds: [roles],
        })
    }
};
