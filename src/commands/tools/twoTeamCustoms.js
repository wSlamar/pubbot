const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminChannel } = process.env;
const moment = require("moment");
require('events').EventEmitter.prototype._maxListeners = 100;
const embeds = require('../../events/client/embeds.js')

let interval;
let eventMonth;
let eventDay;
let eventYear;
let timeStandard;
let zeroTimeStamp;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pub-5v5")
    .setDescription("Replies with an embed for a 5v5 two team event")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) => option
      .setName("event-title")
      .setDescription("title of the event")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("event-description")
      .setDescription("description of the event")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("event-ping")
      .setDescription("what role you would like to ping for the event")
      .setRequired(true)
    )
    .addIntegerOption((option) => option
      .setName("event-month")
      .setDescription("month of the event - MUST BE IN ISO FORMAT - EXAMPLE: 11 or 06")
      .setRequired(true)
    )
    .addIntegerOption((option) => option
      .setName("event-day")
      .setDescription("day of the event - MUST BE IN ISO FORMAT - EXAMPLE: 29 or 07")
      .setRequired(true)
    )
    .addIntegerOption((option) => option
      .setName("event-year")
      .setDescription("year of the event - MUST BE IN ISO FORMAT - EXAMPLE: 2022")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("event-time")
      .setDescription("time of the event - MUST BE IN ISO FORMAT - EXAMPLE: 08:30 PM or 11:05 AM")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("event-image")
      .setDescription("imgur link of the image")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("team-1-emoji")
      .setDescription("emoji that will be associated with the team 1 reaction")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("team-2-emoji")
      .setDescription("emoji that will be associated with the team 2 reaction")
      .setRequired(true)
    ),

  async execute(interaction, client) {
    const playerMap = new Map([
      ["bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]"]],
      ["bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]"]],
      ["bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]"]],
      ["bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]"]],
      ["bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]"]],
      ["redPlayer1", ["[PLAYER 1 OPEN SPOT]", "RED PLAYER 1 ID", "[EMPTY SPOT]"]],
      ["redPlayer2", ["[PLAYER 2 OPEN SPOT]", "RED PLAYER 2 ID", "[EMPTY SPOT]"]],
      ["redPlayer3", ["[PLAYER 3 OPEN SPOT]", "RED PLAYER 3 ID", "[EMPTY SPOT]"]],
      ["redPlayer4", ["[PLAYER 4 OPEN SPOT]", "RED PLAYER 4 ID", "[EMPTY SPOT]"]],
      ["redPlayer5", ["[PLAYER 5 OPEN SPOT]", "RED PLAYER 5 ID", "[EMPTY SPOT]"]],
    ]);

    const eventPing = interaction.options.getString("event-ping");

    const message = await interaction.reply({
      embeds: [embeds.customsEmbed],
      content: eventPing,
      fetchReply: true,
    });

    if (zeroTimeStamp == undefined || zeroTimeStamp == '0, 0, 0, 0') {
      const eventDescription = interaction.options.getString("event-description");
      const eventTitle = interaction.options.getString("event-title");
      const eventImage = interaction.options.getString("event-image");
      const preTeam1Emoji = interaction.options.getString("team-1-emoji");
      const preTeam2Emoji = interaction.options.getString("team-2-emoji");

      let team1Emoji;
      let team2Emoji

      if (preTeam1Emoji.includes(':')) {
        team1Emoji = preTeam1Emoji.split(':')[1]
      } else {
        team1Emoji = preTeam1Emoji
      }

      if (preTeam2Emoji.includes(':')) {
        team2Emoji = preTeam2Emoji.split(':')[1]
      } else {
        team2Emoji = preTeam2Emoji
      }

      eventMonth = interaction.options.getInteger("event-month").toString();
      eventDay = interaction.options.getInteger("event-day").toString();
      eventYear = interaction.options.getInteger("event-year").toString();
      timeStandard = interaction.options.getString("event-time");

      const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
          hours = '00';
        }
        if (modifier === 'PM' || modifier === 'pm') {
          hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
      }

      const timeMilitary = `${convertTime12to24(timeStandard)}:00`

      message.react(preTeam1Emoji).catch(error => {
        if (error.code == 10014) {
          collector.stop()
          buttonCollector.stop()
          clearInterval(interval)
          zeroTimeStamp = '0, 0, 0, 0'
          interaction.followUp({
            embeds: [embeds.emojiEmbed],
            ephemeral: true
          })
          message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with unknown emoji', error); } });
        }
        if (error.code !== 10008) {
          console.error('Error on team 1 emoji:', error);
        }
      });
      message.react(preTeam2Emoji).catch(error => {
        if (error.code == 10014) {
          collector.stop()
          buttonCollector.stop()
          clearInterval(interval)
          zeroTimeStamp = '0, 0, 0, 0'
          interaction.followUp({
            embeds: [embeds.emojiEmbed],
            ephemeral: true
          })
          message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with unknown emoji', error); } });
        }
        if (error.code !== 10008) {
          console.error('Error on team 2 emoji:', error);
        }
      });
      message.react("❌").catch(error => { if (error.code !== 10008) { console.error('Error on X reaction:', error); } });

      const filter = (reaction, user) => {
        return reaction.emoji.name === team1Emoji || reaction.emoji.name === team2Emoji || reaction.emoji.name === "❌" || reaction.emoji.name === "🔨";
      };

      const collector = message.createReactionCollector({ filter, });

      const buttonCollector = client.channels.cache.get(adminChannel).createMessageComponentCollector({ componentType: ComponentType.Button })

      collector.on("collect", async (reaction, user) => {
        const timeElapsed = Date.now();
        const timeStamp = new Date(timeElapsed);
        const localTimeStamp = new Date(timeStamp);
        console.log(`Collected [${reaction.emoji.name}] from [${user.tag}] at [${localTimeStamp.toLocaleString()}]`);
        const fullUserName = user.tag.toString();
        const userNameID = user.id.toString();
        usernameNoTag = fullUserName.substring(0, fullUserName.length - 5);

        const valuesArray = [];
        async function checkIDs(nameID) {
          for (const [key, value] of playerMap) {
            valuesArray.push(value.includes(nameID))
          }
        }
        checkIDs(userNameID);

        if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("bluePlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("bluePlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("bluePlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("bluePlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team1Emoji && playerMap.get("bluePlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("bluePlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        }

        if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("redPlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("redPlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("redPlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("redPlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        } else if (reaction.emoji.name === team2Emoji && playerMap.get("redPlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
          playerMap.set("redPlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
        }

        if (reaction.emoji.name === "❌" && usernameNoTag !== "Pub Bot") {
          setDefault(userNameID);
          removeUserReactions(userNameID);
        }

        refreshEmbed()

        const member = message.guild.members.cache.get(userNameID);
        if (reaction.emoji.name === "🔨" && usernameNoTag !== "Pub Bot") {
          message.reactions.cache.get("🔨").remove();
          if (member.permissions.has(PermissionFlagsBits.BanMembers)) {
            const blueButtons = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('removeBluePlayer1')
                  .setLabel(`${playerMap.get("bluePlayer1")[2]}`)
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId('removeBluePlayer2')
                  .setLabel(`${playerMap.get("bluePlayer2")[2]}`)
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId('removeBluePlayer3')
                  .setLabel(`${playerMap.get("bluePlayer3")[2]}`)
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId('removeBluePlayer4')
                  .setLabel(`${playerMap.get("bluePlayer4")[2]}`)
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId('removeBluePlayer5')
                  .setLabel(`${playerMap.get("bluePlayer5")[2]}`)
                  .setStyle(ButtonStyle.Primary),
              );
            const redButtons = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('removeRedPlayer1')
                  .setLabel(`${playerMap.get("redPlayer1")[2]}`)
                  .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                  .setCustomId('removeRedPlayer2')
                  .setLabel(`${playerMap.get("redPlayer2")[2]}`)
                  .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                  .setCustomId('removeRedPlayer3')
                  .setLabel(`${playerMap.get("redPlayer3")[2]}`)
                  .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                  .setCustomId('removeRedPlayer4')
                  .setLabel(`${playerMap.get("redPlayer4")[2]}`)
                  .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                  .setCustomId('removeRedPlayer5')
                  .setLabel(`${playerMap.get("redPlayer5")[2]}`)
                  .setStyle(ButtonStyle.Danger),
              );

            const channel = client.channels.cache.get(adminChannel);
            modMessage = await channel.send({
              content: `<@${userNameID}> Which player would you like to remove from **${eventTitle}**?\n`,
              components: [blueButtons, redButtons]
            });

            await buttonCollector.on('collect', i => {
              switch (i.customId) {
                case 'removeBluePlayer1':
                  removeUserReactions(playerMap.get("bluePlayer1")[1]);
                  setDefault(playerMap.get("bluePlayer1")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer1 button:', error); } });
                  break;

                case 'removeBluePlayer2':
                  removeUserReactions(playerMap.get("bluePlayer2")[1]);
                  setDefault(playerMap.get("bluePlayer2")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer2 button:', error); } });
                  break;

                case 'removeBluePlayer3':
                  removeUserReactions(playerMap.get("bluePlayer3")[1]);
                  setDefault(playerMap.get("bluePlayer3")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer3 button:', error); } });
                  break;

                case 'removeBluePlayer4':
                  removeUserReactions(playerMap.get("bluePlayer4")[1]);
                  setDefault(playerMap.get("bluePlayer4")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer4 button:', error); } });
                  break;

                case 'removeBluePlayer5':
                  removeUserReactions(playerMap.get("bluePlayer5")[1]);
                  setDefault(playerMap.get("bluePlayer5")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeBluePlayer5 button:', error); } });
                  break;

                case 'removeRedPlayer1':
                  removeUserReactions(playerMap.get("redPlayer1")[1]);
                  setDefault(playerMap.get("redPlayer1")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer1 button:', error); } });
                  break;

                case 'removeRedPlayer2':
                  removeUserReactions(playerMap.get("redPlayer2")[1]);
                  setDefault(playerMap.get("redPlayer2")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer2 button:', error); } });
                  break;

                case 'removeRedPlayer3':
                  removeUserReactions(playerMap.get("redPlayer3")[1]);
                  setDefault(playerMap.get("redPlayer3")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer3 button:', error); } });
                  break;

                case 'removeRedPlayer4':
                  removeUserReactions(playerMap.get("redPlayer4")[1]);
                  setDefault(playerMap.get("redPlayer4")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer4 button:', error); } });
                  break;

                case 'removeRedPlayer5':
                  removeUserReactions(playerMap.get("redPlayer5")[1]);
                  setDefault(playerMap.get("redPlayer5")[1]);
                  modMessage.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removeRedPlayer5 button:', error); } });
                  break;

                default:
                  break;
              }
            });
          }
        }

        async function removeUserReactions(duplicateUser) {
          const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(duplicateUser));
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(duplicateUser);
            }
          } catch (error) {
            console.error('Error on removing reacitons.');
          }
        }

        async function setDefault(user) {
          for (const [key, value] of playerMap) {
            if (value.includes(user)) {
              switch (key) {
                case "bluePlayer1":
                  playerMap.set("bluePlayer1", ["[PLAYER 1 OPEN SPOT]", "BLUE PLAYER 1 ID", "[EMPTY SPOT]",]);
                  break;
                case "bluePlayer2":
                  playerMap.set("bluePlayer2", ["[PLAYER 2 OPEN SPOT]", "BLUE PLAYER 2 ID", "[EMPTY SPOT]",]);
                  break;
                case "bluePlayer3":
                  playerMap.set("bluePlayer3", ["[PLAYER 3 OPEN SPOT]", "BLUE PLAYER 3 ID", "[EMPTY SPOT]",]);
                  break;
                case "bluePlayer4":
                  playerMap.set("bluePlayer4", ["[PLAYER 4 OPEN SPOT]", "BLUE PLAYER 4 ID", "[EMPTY SPOT]",]);
                  break;
                case "bluePlayer5":
                  playerMap.set("bluePlayer5", ["[PLAYER 5 OPEN SPOT]", "BLUE PLAYER 5 ID", "[EMPTY SPOT]",]);
                  break;

                case "redPlayer1":
                  playerMap.set("redPlayer1", ["[PLAYER 1 OPEN SPOT]", "RED PLAYER 1 ID", "[EMPTY SPOT]",]);
                  break;
                case "redPlayer2":
                  playerMap.set("redPlayer2", ["[PLAYER 2 OPEN SPOT]", "RED PLAYER 2 ID", "[EMPTY SPOT]",]);
                  break;
                case "redPlayer3":
                  playerMap.set("redPlayer3", ["[PLAYER 3 OPEN SPOT]", "RED PLAYER 3 ID", "[EMPTY SPOT]",]);
                  break;
                case "redPlayer4":
                  playerMap.set("redPlayer4", ["[PLAYER 4 OPEN SPOT]", "RED PLAYER 4 ID", "[EMPTY SPOT]",]);
                  break;
                case "redPlayer5":
                  playerMap.set("redPlayer5", ["[PLAYER 5 OPEN SPOT]", "RED PLAYER 5 ID", "[EMPTY SPOT]",]);
                  break;

                default:
                  break;
              }
              refreshEmbed()
            }
          }
        }

        if (reaction.emoji.name === team1Emoji || reaction.emoji.name === team2Emoji) {
          const blueIDs = [playerMap.get("bluePlayer1")[1], playerMap.get("bluePlayer2")[1], playerMap.get("bluePlayer3")[1], playerMap.get("bluePlayer4")[1], playerMap.get("bluePlayer5")[1],];
          const redIDs = [playerMap.get("redPlayer1")[1], playerMap.get("redPlayer2")[1], playerMap.get("redPlayer3")[1], playerMap.get("redPlayer4")[1], playerMap.get("redPlayer5")[1],];

          for (var i = 0; i < blueIDs.length; i++) {
            for (var j = 0; j < redIDs.length; j++) {
              if (blueIDs[i] == redIDs[j]) {
                removeUserReactions(blueIDs[i]);
                setDefault(blueIDs[i]);
              }
            }
          }
        }
      });

      collector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);
      });
      buttonCollector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
      });

      const eventDayMoment = moment(`${eventYear}-${eventMonth}-${eventDay} ${timeMilitary}`);
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const countDownFn = () => {
        const today = moment();
        const timeSpan = eventDayMoment.diff(today);

        if (timeSpan <= -today) {
          clearInterval(interval);
          collector.stop()
          buttonCollector.stop()
          return;
        } else if (timeSpan <= 0) {
          clearInterval(interval);
          collector.stop()
          buttonCollector.stop()
          refreshCounter('0', '0', '0', '0')
          interaction.followUp({
            content: `${eventPing} **${eventTitle}** has started!`
          })
          return;
        } else {
          const days = Math.floor(timeSpan / day);
          const hours = Math.floor((timeSpan % day) / hour);
          const minutes = Math.floor((timeSpan % hour) / minute);
          const seconds = Math.floor((timeSpan % minute) / second);

          if (eventDayMoment.isValid()) {
            refreshCounter(days, hours, minutes)
          } else {
            collector.stop()
            buttonCollector.stop()
            clearInterval(interval)
            zeroTimeStamp = '0, 0, 0, 0'

            interaction.followUp({
              embeds: [embeds.formatEmbed],
              ephemeral: true
            })
            message.delete().catch(error => { if (error.code !== 10008) { console.error('Error on removing message with incorrect format', error); } });
          }
        }
      };

      interval = setInterval(countDownFn, 5000);

      const customsEmbed = new EmbedBuilder()
        .setColor('#165316')
        .setTitle(eventTitle)
        .setDescription(`${timeStandard} EST on ${eventMonth}/${eventDay}/${eventYear}`)
        .setThumbnail(eventImage)
        .setFooter({ text: `To be removed from a team, or change teams, react with ❌ to this message.\nThis event will start in 0 days, 0 hours, and 0 minutes` })
        .addFields(
          {
            name: "CLICK A TEAM EMOJI BELOW TO JOIN A TEAM",
            value: `${eventDescription}`,
          },
          {
            name: `${preTeam1Emoji} TEAM 1 ${preTeam1Emoji}`,
            value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[0]}`,
            inline: true,
          },
          {
            name: `${preTeam2Emoji} TEAM 2 ${preTeam2Emoji}`,
            value: `${playerMap.get("redPlayer1")[0]}\n${playerMap.get("redPlayer2")[0]}\n${playerMap.get("redPlayer3")[0]}\n${playerMap.get("redPlayer4")[0]}\n${playerMap.get("redPlayer5")[0]}`,
            inline: true,
          }
        );

      function refreshEmbed() {
        message.edit({
          embeds: [customsEmbed.setFields(
            {
              name: `CLICK A TEAM EMOJI BELOW TO JOIN A TEAM`,
              value: `${eventDescription}`,
            },
            {
              name: `${preTeam1Emoji} TEAM 1 ${preTeam1Emoji}`,
              value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[0]}`,
              inline: true,
            },
            {
              name: `${preTeam2Emoji} TEAM 2 ${preTeam2Emoji}`,
              value: `${playerMap.get("redPlayer1")[0]}\n${playerMap.get("redPlayer2")[0]}\n${playerMap.get("redPlayer3")[0]}\n${playerMap.get("redPlayer4")[0]}\n${playerMap.get("redPlayer5")[0]}`,
              inline: true,
            }
          )],
          content: `${eventPing}`,
        }).catch(error => {
          collector.stop()
          buttonCollector.stop()
          clearInterval(interval)
          zeroTimeStamp = '0, 0, 0, 0'
          if (error.code !== 10008) { console.error('Error on message edit:', error); }
        });
      }

      function refreshCounter(days, hours, minutes) {
        zeroTimeStamp = `${days}, ${hours}, ${minutes}, 0`
        message.edit({ embeds: [customsEmbed.setFooter({ text: `To be removed from a team, or change teams, react with ❌ to this message.\nThis event will start in ${days} days, ${hours} hours, and ${minutes} minutes` })] }).catch(error => {
          collector.stop()
          buttonCollector.stop()
          clearInterval(interval)
          zeroTimeStamp = '0, 0, 0, 0'
          if (error.code !== 10008) { console.error('Error on message edit:', error); }
        });
      }
    } else {
      interaction.followUp({
        content: `There is already an iteration of this event currently happening. You must wait until the current event is over to use this command again. You may use this command again on **${eventMonth}/${eventDay}/${eventYear}** at **${timeStandard}**.`,
        ephemeral: true
      })
      message.delete();
    }
  }
};

