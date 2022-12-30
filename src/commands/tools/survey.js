const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const embeds = require('../../events/client/embeds.js')
const moment = require("moment");

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
    .addIntegerOption((option) => option
      .setName("poll-time")
      .setDescription("how many hours until the poll ends")
      .setRequired(true)
      .addChoices(
        { name: '1 Hour', value: 1 },
        { name: '2 Hours', value: 2 },
        { name: '3 Hours', value: 3 },
        { name: '4 Hours', value: 4 },
        { name: '5 Hours', value: 5 },
      )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ),
  async execute(interaction, client) {
    console.log('\x1b[36m','/pub-poll has been kicked off','\x1b[0m')
    const question = interaction.options.getString("poll-question");
    let firstEmoji = interaction.options.getString("poll-first-emoji");
    const firstDescription = interaction.options.getString("poll-first-description");
    let secondedEmoji = interaction.options.getString("poll-second-emoji");
    const secondedDescription = interaction.options.getString("poll-second-description");
    const pollImage = interaction.options.getAttachment("poll-image");
    const pollHourTime = interaction.options.getInteger("poll-time").toString();

    const today = moment()
    const todayAddHour = moment(today).add(pollHourTime, 'hours');
    const todayAddHourUnix = todayAddHour.unix()

    const embed = new EmbedBuilder()
      .setColor('#167301')
      .setImage(pollImage.attachment)
      .setTitle("PUB POLL")
      .setDescription(`${question}\n\n${firstEmoji}  ${firstDescription}  ${firstEmoji}\n\n${secondedEmoji}  ${secondedDescription}  ${secondedEmoji}`)

    const message = await interaction.reply({
      content: `This poll will end <t:${todayAddHourUnix}:R>`,
      embeds: [embed],
      fetchReply: true,
    })
    message.react(firstEmoji).catch(error => {
      if (error.code == 10014) {
        interaction.followUp({
          embeds: [embeds.emojiEmbed],
          ephemeral: true
        })
        message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with unknown emoji', error); } });
      }
      if (error.code !== 10008) {
        console.error('Error on first emoji reaction:', error);
      }
    });

    message.react(secondedEmoji).catch(error => {
      if (error.code == 10014) {
        interaction.followUp({
          embeds: [embeds.emojiEmbed],
          ephemeral: true
        })
        message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with unknown emoji', error); } });
      }
      if (error.code !== 10008) {
        console.error('Error on seconded emoji reaction:', error);
      }
    });

    setTimeout(() => {
      message.edit({ content: `This poll has ended` }).catch(error => { if (error.code !== 10008) { console.error('Error on editing message', error); } });

      if (firstEmoji.includes(':')) {
        firstEmoji = firstEmoji.split(':')[2]
        firstEmoji = firstEmoji.replace('>', '')
      }

      if (secondedEmoji.includes(':')) {
        secondedEmoji = secondedEmoji.split(':')[2]
        secondedEmoji = secondedEmoji.replace('>', '')
      }

      const firstEmojicount = message.reactions.cache.get(firstEmoji).count;
      const secondEmojicount = message.reactions.cache.get(secondedEmoji).count;

      if (firstEmojicount > secondEmojicount) {
        const pollEnd = message.reply({
          content: `**${firstDescription}** is the winner of this poll!`,
        }).catch(error => { if (error.code !== 10008) { console.error('Error on replying', error); } });;
      }
      if (firstEmojicount < secondEmojicount) {
        const pollEnd = message.reply({
          content: `**${secondedDescription}** is the winner of this poll!`,
        }).catch(error => { if (error.code !== 10008) { console.error('Error on replying', error); } });;
      }
      if (firstEmojicount == secondEmojicount) {
        const pollEnd = message.reply({
          content: `**${firstDescription}** and **${secondedDescription}** have tied in this poll!`,
        }).catch(error => { if (error.code !== 10008) { console.error('Error on replying', error); } });;
      }
    }, pollHourTime * 1000 * 60 * 60);
  },
};
