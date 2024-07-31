const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { pinkDiamondEmoji } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kraken-help")
        .setDescription("Command for explaining Kraken and its commands")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

    async execute(interaction, client) {
        console.log('\x1b[36m','/kraken-help has been kicked off','\x1b[0m')
        const helpEmbed = new EmbedBuilder()
            .setColor('#ff7ee2')
            .setFooter({text: 'Made with ❤️ by meatbuck'})
            .setTitle("KRAKEN BOT")
            .setDescription("The list of commands has been provided below with an overview of their functions.")
            .addFields(
                {
                    name: `${pinkDiamondEmoji}  /kraken-aram`,
                    value: "This command will create a signup embed for players who want to participate in a Custom League of Legends ARAM Event.\n\nOnce this command has been used, Mojito will create an embed that features all of the details of the event and players will be able to react to the embed with the corresponding emoji to sign up. Once the command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                }, 
                {
                    name: `${pinkDiamondEmoji}  /kraken-rift`,
                    value: "This command will create a signup embed for players who want to participate in a Custom League of Legends Summoners Rift Event.\n\nOnce this command has been used, Mojito will create an embed that features all of the details of the event and players will be able to react to the embed with the corresponding emoji to sign up. Once the command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                },
                {
                    name: `${pinkDiamondEmoji}  /kraken-tft`,
                    value: "This command will create a signup embed for players who want to participate in a Custom League of Legends TFT Event.\n\nOnce this command has been used, Mojito will create an embed that features all of the details of the event and players will be able to react to the embed with the corresponding emoji to sign up. Once the command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                },
                {
                    name: `${pinkDiamondEmoji}  /kraken-arena`,
                    value: "This command will create a signup embed for players who want to participate in a Custom League of Legends Arena Event.\n\nOnce this command has been used, Mojito will create an embed that features all of the details of the event and players will be able to react to the embed with the corresponding emoji to sign up. Once the command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                },
                {
                    name: `${pinkDiamondEmoji}  /kraken-custom`,
                    value: "This command will create a signup embed for players who want to participate in a Custom Game Event.\n\nOnce this command has been used, Mojito will create an embed that features all of the details of the event and players will be able to react to the embed with the corresponding emoji to sign up. Once the command has ended at its set time, users will be unable to react to the embed and a follow up message will be sent with a link to the voice channel that the event will take place in.\n‎",
                },
                {
                    name: `${pinkDiamondEmoji}  /kraken-list`,
                    value: "This commands main function is to create a randomly generated list of text embed. This command can only be used by moderators or admins.\n‎",
                },
            )

        const message = await interaction.reply({
            embeds: [helpEmbed],
            ephemeral: true
        });
    }
};