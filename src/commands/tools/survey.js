const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: (survey = new SlashCommandBuilder()
    .setName("pub-survey")
    .setDescription("Create a custom survey")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("firstemoji")
        .setDescription("first emoji for the survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("firstdescription")
        .setDescription("first option description for the survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("secondedemoji")
        .setDescription("seconded emoji for the survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("secondeddescription")
        .setDescription("seconded option description for the survey question")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
  ),
  async execute(interaction, client) {
    const password = interaction.options.getString("password");
    const question = interaction.options.getString("question");
    const firstEmoji = interaction.options.getString("firstemoji");
    const firstDescription = interaction.options.getString("firstdescription");
    const secondedEmoji = interaction.options.getString("secondedemoji");
    const secondedDescription = interaction.options.getString(
      "secondeddescription"
    );

    const incorrectPasswordEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("INCORRECT PASSWORD")
      .setDescription(
        `Some of these commands are password protected to prevent spam in the server. Too many attempts of incorrect password attempts will be sent to the mods and could result in a ban.`
      );

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Pub Poll Question")
      .setDescription(question)
      .addFields({
        name: "REACTIONS:",
        value: `${firstEmoji} ${firstDescription} ${firstEmoji}
                \n${secondedEmoji} ${secondedDescription} ${secondedEmoji}`,
      });

      const message = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
      })
      message.react(firstEmoji)
      message.react(secondedEmoji)
      ;
  },
};
