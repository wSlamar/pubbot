const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: (poll = new SlashCommandBuilder()
    .setName("pub-poll")
    .setDescription("Replies with an embed for creating a custom poll")
    .addStringOption((option) =>
      option
        .setName("poll-question")
        .setDescription("poll question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("poll-first-emoji")
        .setDescription("first emoji for the poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("poll-first-description")
        .setDescription("first option description for the poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("poll-second-emoji")
        .setDescription("second emoji for the poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("poll-second-description")
        .setDescription("second option description for the poll")
        .setRequired(true)
    )
    .addAttachmentOption((option) => option
      .setName("poll-image")
      .setDescription("image associated with the poll")
      .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ),
  async execute(interaction, client) {
    const question = interaction.options.getString("poll-question");
    const firstEmoji = interaction.options.getString("poll-first-emoji");
    const firstDescription = interaction.options.getString("poll-first-description");
    const secondedEmoji = interaction.options.getString("poll-second-emoji");
    const secondedDescription = interaction.options.getString("poll-second-description");
    const pollImage = interaction.options.getAttachment("poll-image");

    const embed = new EmbedBuilder()
      .setColor('#AB561C')
      .setImage(pollImage.attachment)
      .setTitle("PUB POLL")
      .setDescription(`${question}\n\n${firstEmoji}  ${firstDescription}  ${firstEmoji}\n\n${secondedEmoji}  ${secondedDescription}  ${secondedEmoji}`)

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    })
    message.react(firstEmoji);
    message.react(secondedEmoji);
  },
};
