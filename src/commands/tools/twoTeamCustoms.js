const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { guildId } = process.env;
const {adminChannel} = process.env;

let modMessage;
require('events').EventEmitter.prototype._maxListeners = 100;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pub-twoteamcustoms")
    .setDescription("Replies with an embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog),

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

    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function formatDate(date) {
      return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join("/");
    }

    let date = formatDate(new Date());

    const customsEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("THURSDAY NIGHT CUSTOMS")
      .setDescription(`6:00PM EST on ${date}`)
      .setFooter({ text: 'To be removed from a team, or change teams, react with ❌ to this message.' })
      .addFields(
        {
          name: "CLICK YOUR TEAM EMOJI BELOW TO GET ON THE LIST",
          value:
            "Customs will be held in the Customers Team 1 and Customs Team 2 chat",
        },
        {
          name: "🔵 TEAM 1 🔵",
          value:
            "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
          inline: true,
        },
        {
          name: "🔴 TEAM 2 🔴",
          value:
            "[PLAYER 1 OPEN SPOT]\n[PLAYER 2 OPEN SPOT]\n[PLAYER 3 OPEN SPOT]\n[PLAYER 4 OPEN SPOT]\n[PLAYER 5 OPEN SPOT]",
          inline: true,
        }
      );

    const message = await interaction.reply({
      content: '@everyone',
      embeds: [customsEmbed],
      fetchReply: true,
    });

    message.react("🔵");
    message.react("🔴");
    message.react("❌");

    const filter = (reaction, user) => {
      return reaction.emoji.name === "🔵" || reaction.emoji.name === "🔴" || reaction.emoji.name === "❌" || reaction.emoji.name === "🔨";
    };

    const collector = message.createReactionCollector({
      filter,
      time: 80000,
    });

    const buttonCollector = client.channels.cache.get(adminChannel).createMessageComponentCollector({ componentType: ComponentType.Button, time: 80000 })

    collector.on("collect", async (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
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
      if (reaction.emoji.name === "🔵" && playerMap.get("bluePlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("bluePlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔵" && playerMap.get("bluePlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("bluePlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔵" && playerMap.get("bluePlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("bluePlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔵" && playerMap.get("bluePlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("bluePlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔵" && playerMap.get("bluePlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("bluePlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      }

      if (reaction.emoji.name === "🔴" && playerMap.get("redPlayer1").includes("[PLAYER 1 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("redPlayer1", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔴" && playerMap.get("redPlayer2").includes("[PLAYER 2 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("redPlayer2", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔴" && playerMap.get("redPlayer3").includes("[PLAYER 3 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("redPlayer3", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔴" && playerMap.get("redPlayer4").includes("[PLAYER 4 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("redPlayer4", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      } else if (reaction.emoji.name === "🔴" && playerMap.get("redPlayer5").includes("[PLAYER 5 OPEN SPOT]") && usernameNoTag !== "Pub Bot" && !valuesArray.includes(true)) {
        playerMap.set("redPlayer5", [`<@${userNameID}>`, userNameID, fullUserName]); checkIDs(userNameID);
      }

      if (reaction.emoji.name === "❌" && usernameNoTag !== "Pub Bot") {
        setDefault(userNameID);
        removeUserReactions(userNameID);
      }

      const member = message.guild.members.cache.get(userNameID);
      if (reaction.emoji.name === "🔨" && usernameNoTag !== "Pub Bot") {
        message.reactions.cache.get("🔨").remove();
        if (member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
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
          modMessage = channel.send({ content: `<@${userNameID}> What player would you like to remove?\n**WARNING:** This message will be automatically deleted in 3 mintues.`, components: [blueButtons, redButtons] })
            .then(msg => {
              setTimeout(() => msg.delete(), 80000)
            });
        }
      }

      refreshEmbed();

      async function removeUserReactions(duplicateUser) {
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(duplicateUser));
        try {
          for (const reaction of userReactions.values()) {
            await reaction.users.remove(duplicateUser);
          }
        } catch (error) {
          console.error('Failed to remove reactions.');
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
            refreshEmbed();
          }
        }
      }

      buttonCollector.on('collect', i => {
        switch (i.customId) {
          case 'removeBluePlayer1':
            removeUserReactions(playerMap.get("bluePlayer1")[1]);
            setDefault(playerMap.get("bluePlayer1")[1]);
            break;

          case 'removeBluePlayer2':
            removeUserReactions(playerMap.get("bluePlayer2")[1]);
            setDefault(playerMap.get("bluePlayer2")[1]);
            break;

          case 'removeBluePlayer3':
            removeUserReactions(playerMap.get("bluePlayer3")[1]);
            setDefault(playerMap.get("bluePlayer3")[1]);
            break;

          case 'removeBluePlayer4':
            removeUserReactions(playerMap.get("bluePlayer4")[1]);
            setDefault(playerMap.get("bluePlayer4")[1]);
            break;

          case 'removeBluePlayer5':
            removeUserReactions(playerMap.get("bluePlayer5")[1]);
            setDefault(playerMap.get("bluePlayer5")[1]);
            break;

          case 'removeRedPlayer1':
            removeUserReactions(playerMap.get("redPlayer1")[1]);
            setDefault(playerMap.get("redPlayer1")[1]);
            break;

          case 'removeRedPlayer2':
            removeUserReactions(playerMap.get("redPlayer2")[1]);
            setDefault(playerMap.get("redPlayer2")[1]);
            break;

          case 'removeRedPlayer3':
            removeUserReactions(playerMap.get("redPlayer3")[1]);
            setDefault(playerMap.get("redPlayer3")[1]);
            break;

          case 'removeRedPlayer4':
            removeUserReactions(playerMap.get("redPlayer4")[1]);
            setDefault(playerMap.get("redPlayer4")[1]);
            break;

          case 'removeRedPlayer5':
            removeUserReactions(playerMap.get("redPlayer5")[1]);
            setDefault(playerMap.get("redPlayer5")[1]);
            break;

          default:
            break;
        }
      });

      if (reaction.emoji.name === "🔵" || reaction.emoji.name === "🔴") {
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

    function refreshEmbed() {
      const customsEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("THURSDAY NIGHT CUSTOMS")
        .setDescription(`6:00PM EST on ${date}`)
        .setFooter({ text: 'To be removed from a team, or change teams, react with ❌ to this message.' })
        .addFields(
          {
            name: "CLICK YOUR TEAM EMOJI BELOW TO GET ON THE LIST",
            value: "Customs will be held in the Customers Team 1 and Customs Team 2 chat",
          },
          {
            name: "🔵 TEAM 1 🔵",
            value: `${playerMap.get("bluePlayer1")[0]}\n${playerMap.get("bluePlayer2")[0]}\n${playerMap.get("bluePlayer3")[0]}\n${playerMap.get("bluePlayer4")[0]}\n${playerMap.get("bluePlayer5")[0]}`,
            inline: true,
          },
          {
            name: "🔴 TEAM 2 🔴",
            value: `${playerMap.get("redPlayer1")[0]}\n${playerMap.get("redPlayer2")[0]}\n${playerMap.get("redPlayer3")[0]}\n${playerMap.get("redPlayer4")[0]}\n${playerMap.get("redPlayer5")[0]}`,
            inline: true,
          }
        );
      message.edit({ embeds: [customsEmbed], content: '@everyone',});
    }

  },
};