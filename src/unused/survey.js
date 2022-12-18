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
        .setName("first-emoji")
        .setDescription("first emoji for the survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("first-description")
        .setDescription("first option description for the survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("second-emoji")
        .setDescription("second emoji for the survey question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("second-description")
        .setDescription("second option description for the survey question")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
  ),
  async execute(interaction, client) {
    const question = interaction.options.getString("question");
    const firstEmoji = interaction.options.getString("first-emoji");
    const firstDescription = interaction.options.getString("first-description");
    const secondedEmoji = interaction.options.getString("second-emoji");
    const secondedDescription = interaction.options.getString("second-description");

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Pub Poll Question")
      .setDescription(question)
      .addFields({
        name: "REACTIONS:",
        value: `${firstEmoji} ${firstDescription} ${firstEmoji}\n${secondedEmoji} ${secondedDescription} ${secondedEmoji}`,
      });

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    })
    message.react(firstEmoji);
    message.react(secondedEmoji);
  },
};
