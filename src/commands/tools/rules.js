const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { aramEmoji } = process.env;
const { customAramEmoji } = process.env;
const { riftEmoji } = process.env;
const { customRiftEmoji } = process.env;
const { tftEmoji } = process.env;
const { aramRulesChannel } = process.env;
const { riftRulesChannel } = process.env;
const { tftRulesChannel } = process.env;
const { barKeepsRole } = process.env;
const { barOwnerRole } = process.env;
const { localPubEmoji } = process.env;
const { rolesChannel } = process.env;
const { patreonRole } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-rules")
        .setDescription("Return an embed with the server rules or customs rules")
        .addStringOption((option) => option
            .setName("rules")
            .setDescription("rules embed that will be sent")
            .setRequired(true)
            .addChoices(
                { name: 'Server Rules', value: 'Server Rules' },
                { name: 'Admin Rules', value: 'Admin Rules' },
                { name: 'Custom ARAM Rules', value: 'Custom ARAM Rules' },
                { name: 'Custom Summoners Rift Rules', value: 'Custom Summoners Rift Rules' },
                { name: 'TFT Rules', value: 'TFT Rules' },
            )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        console.log('\x1b[36m', '/pub-rules has been kicked off', '\x1b[0m')
        const ruleSet = interaction.options.getString("rules");

        const aramRules = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/aDVseTe.png')
            .setTitle(`${aramEmoji}  CUSTOM ARAM RULES AND GUIDELINES  ${aramEmoji}`)
            .setDescription(`Please keep in mind our mods may punish at their own discretion depending on the situation. Warnings may not be necessary if the circumstances are too unruly. \n‎`)
            .addFields(
                {
                    name: `🔱  ONE CHAMPION PER NIGHT / CUSTOMS  🔱`,
                    value: `You man only play a champion one time a night and / or customs session. If this rule is not followed, this can be punishable by one strike.\n‎`,
                },
                {
                    name: `💤  SITTING AFK  💤`,
                    value: `Sitting AFK in base while the game is still winnable is not permitted, although waiting on gold is allowed. If this rule is not followed, this can be punishable by one strike.\n‎`,
                },
                {
                    name: `🚫  INTING  🚫`,
                    value: `Hard inting and soft inting are both considered feeding and will not be tolerated. If this rule is not followed, this can be punishable by one strike.\n‎`
                },
                {
                    name: `❤️  RESPECT EACH OTHER  ❤️`,
                    value: `Please stay respectful in voice chat and in-game chat. If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `🧠  SKILL LEVEL  🧠`,
                    value: `We invite any skill level to participate in our Customs lobbies. We play the game to have fun at a competitive level. \n‎`
                },
                {
                    name: `📝  IGN / NICKNAME  📝`,
                    value: `If you are participating in Customs, please change your Discord nickname to your in game name to help reduce confusion. \n‎`
                },
                {
                    name: `👀  SPECTATORS  👀`,
                    value: `We welcome spectators to join our custom lobbies but we ask that they stay respectful to the players that are currently playing. For example, do not give away positions or plays and do not be a distraction to the players.`
                }
            )

        const summonersRiftRules = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/2MaIHMp.png')
            .setTitle(`${riftEmoji}  CUSTOM RIFT RULES AND GUIDELINES  ${riftEmoji}`)
            .setDescription(`Please keep in mind our mods may punish at their own discretion depending on the situation. Warnings may not be necessary if the circumstances are too unruly. \n‎`)
            .addFields(
                {
                    name: `🔱  ONE CHAMPION PER NIGHT / CUSTOMS  🔱`,
                    value: `You man only play a champion one time a night and / or customs session. If this rule is not followed, this can be punishable by one strike.\n‎`,
                },
                {
                    name: `💤  SITTING AFK  💤`,
                    value: `Sitting AFK in base while the game is still winnable is not permitted, although waiting on gold is allowed. If this rule is not followed, this can be punishable by one strike.\n‎`,
                },
                {
                    name: `🚫  INTING  🚫`,
                    value: `Hard inting and soft inting are both considered feeding and will not be tolerated. If this rule is not followed, this can be punishable by one strike.\n‎`
                },
                {
                    name: `❤️  RESPECT EACH OTHER  ❤️`,
                    value: `Please stay respectful in voice chat and in-game chat. If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `🧠  SKILL LEVEL  🧠`,
                    value: `We invite any skill level to participate in our Customs lobbies. We play the game to have fun at a competitive level. \n‎`
                },
                {
                    name: `📝  IGN / NICKNAME  📝`,
                    value: `If you are participating in Customs, please change your Discord nickname to your in game name to help reduce confusion. \n‎`
                },
                {
                    name: `👀  SPECTATORS  👀`,
                    value: `We welcome spectators to join our custom lobbies but we ask that they stay respectful to the players that are currently playing. For example, do not give away positions or plays and do not be a distraction to the players.`
                }
            )

        const tftRules = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/iZD4ihw.png')
            .setTitle(`${tftEmoji}  TFT RULES AND GUIDELINES  ${tftEmoji}`)
            .setDescription(`Please keep in mind our mods may punish at their own discretion depending on the situation. Warnings may not be necessary if the circumstances are too unruly. \n‎`)
            .addFields(
                {
                    name: `❤️  RESPECT EACH OTHER  ❤️`,
                    value: `Please stay respectful in voice chat and in-game chat. If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `🧠  SKILL LEVEL  🧠`,
                    value: `We invite any skill level to participate in our Customs lobbies. We play the game to have fun at a competitive level. \n‎`
                },
                {
                    name: `📝  IGN / NICKNAME  📝`,
                    value: `If you are participating in Customs, please change your Discord nickname to your in game name to help reduce confusion. \n‎`
                },
                {
                    name: `👀  SPECTATORS  👀`,
                    value: `We welcome spectators to join our custom lobbies but we ask that they stay respectful to the players that are currently playing. For example, do not give away positions or plays and do not be a distraction to the players.`
                }
            )

            const serverRules = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/DKt79Ey.png')
            .setTitle(`${localPubEmoji}  THE LOCAL PUB RULES AND GUIDELINES  ${localPubEmoji}`)
            .setDescription(`We have a three strike system in place that will determine the correct action taken after rule breaking. After three strikes, the user that has broken the following rules will be punished accordingly. Punishments include but are not limited to: timeouts, mutes, kicks and bans. \n‎`)
            .addFields(
                {
                    name: `🚫  NO NSFW  🚫`,
                    value: `No NSFW content within the server. Please keep in mind this does include artwork. If this rule is not followed, this can be punishable by one strike or three if spammed.\n‎`
                },
                {
                    name: `🤬  NO SEVERE TOXICITY  🤬`,
                    value: `This includes any form of discrimination dialogue, racial slurs, or any harmful dialect towards ANYONE or in ANY group setting. If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `🛑  NO SPAMMING / RAIDING  🛑`,
                    value: `If this rule is not followed, spamming is a one day mute and raiding is an instant ban.\n‎`
                },
                {
                    name: `🤷‍♂️  DO NOT IGNORE CHANNEL TOPICS  🤷‍♂️`,
                    value: `Use channels for their intended purposes (e.g. keep the memes and photos in the memes and photos channels). If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `📚  NO GORE / TOS VIOLATION MATERIAL  📚`,
                    value: `If this rule is not followed, you will be banned. Please keep in mind this includes Discord's TOS as well as Riot's TOS (e.g. account selling, cheating, hacking, etc..)\n‎`
                },
                {
                    name: `📸  NO ADVERTISING SERVERS / BUSINESSES 📸`,
                    value: `No advertising your business and no advertising other servers. This also includes things such as "DM me for commissions" or "DM me to join my server". The power to advertise your business within the server comes from collaborating with the Pub and becoming a <@&${patreonRole}>. If you have an interest in becoming a patreon, please reach out to <@&${barKeepsRole}> or <@&${barOwnerRole}>. If this rule is not followed, this can be punishable by one strike.\n‎`
                },
                {
                    name: `❤️  RESPECT EACH OTHER  ❤️`,
                    value: `Be respectful and considerate of others while in our server. If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `🗣️  CONTROVERSIAL CONVERSATIONS  🗣️`,
                    value: `Hold political and controversial conversations to a minimum when in groups. If this rule is not followed, moderators will warn or punish at their own discretion.\n‎`
                },
                {
                    name: `💬  DO NOT EVADE CHAT FILTERS  💬`,
                    value: `If this rule is not followed, this can be punishable by one strike.\n‎`
                },
                {
                    name: `🤖  NO BOT SPAMMING  🤖`,
                    value: `If this rule is not followed, this can be punishable by one strike.\n‎`
                },
                {
                    name: `👨‍💻  COMMUNICATION  👨‍💻`,
                    value: `It is a requirement to be in discord. People who are in discord get priority over those that are not. This does not mean you are required to communicate.\n‎`
                },
                {
                    name: `⛔  E-DATING  ⛔`,
                    value: `Do not use this server as a dating server. No e-dating, fawning, excessive flirting, role playing or other similar behaviors. If this rule is not followed, this can be punishable by two strikes.\n‎`
                },
                {
                    name: `📝  CONTACTING STAFF  📝`,
                    value: `If you have a situation that requires outside intervention, please take a video clip of it and show <@&${barKeepsRole}> or <@&${barOwnerRole}>. We will gladly take a look into it for you!\n‎`
                },
                {
                    name: `${aramEmoji}  CUSTOM ARAM RULES  ${aramEmoji}`,
                    value: `Please see the <#${aramRulesChannel}> thread. \n‎`
                },
                {
                    name: `${riftEmoji}  CUSTOM SUMMONERS RIFT RULES  ${riftEmoji}`,
                    value: `Please see the <#${riftRulesChannel}> thread. \n‎`
                },
                {
                    name: `${tftEmoji}  TFT RULES  ${tftEmoji}`,
                    value: `Please see the <#${tftRulesChannel}> thread.`
                },
            )

            const adminRules = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/DKt79Ey.png')
            .setTitle(`${localPubEmoji}  MODERATOR RULES AND GUIDELINES  ${localPubEmoji}`)
            .setDescription(`As a moderator for The Local Pub, it is our duty to make sure all of our members have an excellent experience while they are here. These rules and guidelines are to ensure we provide the utmost service to our members, as well as our fellow staff.  \n‎`)
            .addFields(
                {
                    name: `⛔  E-DATING  ⛔`,
                    value: `Do not use this server as a dating server. No e-dating, fawning, excessive flirting, role playing or other similar behaviors with ANYONE.\n‎`
                },
                {
                    name: `🚫  WARNING / STRIKING  🚫`,
                    value: `Always discuss or talk to a player independently first before warning or striking.\n‎`
                },
                {
                    name: `🤷‍♂️  DO NOT IGNORE CHANNEL TOPICS  🤷‍♂️`,
                    value: `Please post content in the proper channels. We moderate this for our players but it applies to staff as well.\n‎`
                },
                {
                    name: `📈  STAFF MEETINGS  📈`,
                    value: `Attending staff meetings are required. If you cannot attend for whatever reason, please see the server owner about it. This simply ensures we are all on the same page as a team and family.\n‎`
                },
                {
                    name: `🙂  ATTITUDE  🙂`,
                    value: `Attitude is everything! Do not use negative or toxic attitudes towards other staff and players. Egoing is not allowed. Be respectful to everyone even if you disagree.\n‎`
                },
                {
                    name: `🤐  CONFIDENTIAL CONVERSATIONS  🤐`,
                    value: `What is discussed in admin chats or in the Pub RND Test Server is not to be shared outside of those topics and channels. Immediate removal from staff if this happens.\n‎`
                },
                {
                    name: `🧱  NO STACKING TEAMS  🧱`,
                    value: `As staff we want to make this an enjoyable environment. Please do not elo/mmr stack teams. Ranks and skill level should be dispersed evenly.\n‎`
                },
                {
                    name: `🍻  NEW MEMBERS  🍻`,
                    value: `React to new members and staff with the cheers emoji. Make everyone feel welcomed!\n‎`
                },
                {
                    name: `💡  NEW TOPICS AND IDEAS  💡`,
                    value: `New topics and ideas about future events should be discussed with the server owner or saved for a monthly meeting.\n‎`
                },
                {
                    name: `💬  CHAT ACTIVITY  💬`,
                    value: `Please stay active in chats! Throughout your day, try to look over topics and chats.\n‎`
                },
                {
                    name: `📅  EVENTS / LOBBIES  📅`,
                    value: `After events and lobbies, please clean up after yourself. This includes: making sure nobody is left in the lobby, closing out your lobby permissions, and moving AFK people to the AFK channel. \n‎`
                },
                {
                    name: `🗣️  SPEAKING OUT  🗣️`,
                    value: `If you see another staff member breaking rules, it is your job and responsibility to report that staff member with proof if possible. We are a team and a family!\n‎`
                },
                {
                    name: `📝  IGN / NICKNAME  📝`,
                    value: `Mods need to ensure each players IGN is their discord name / nickname in the server. You are required to change it if they are actively in your lobby and have not done so. All staff members are also required to have their IGN as their name / nickname. Please refrain from having extra characters, numbers, or letters in it that do NOT match your IGN.\n‎`
                },
                {
                    name: `🔱  LOBBY LIMITATIONS  🔱`,
                    value: `No more than two mods in a custom made game at a time. Unless requesting a third for support, backup or disciplinary actions are needed. Players are a priority with these lobbies so they come before mods when it comes time to fill spots. Unless you are hosting the lobby, please sit out or start a new lobby if possible.`
                },

            )

        let channelComannd = client.channels.cache.get(interaction.channelId);

        const replyMessage = await interaction.reply({
            content: "/pub-rules has been kicked off",
            ephemeral: true
        });

        if (ruleSet == 'Custom ARAM Rules') {
            const message = await channelComannd.send({
                embeds: [aramRules],
            });
        }
        if (ruleSet == 'Custom Summoners Rift Rules') {
            const message = await channelComannd.send({
                embeds: [summonersRiftRules],
            });
        }
        if (ruleSet == 'TFT Rules') {
            const message = await channelComannd.send({
                embeds: [tftRules],
            });
        }
        if (ruleSet == 'Admin Rules') {
            const message = await channelComannd.send({
                embeds: [adminRules],
            });
        }
        if (ruleSet == 'Server Rules') {
            const message = await channelComannd.send({
                embeds: [serverRules],
            });

            const rolesEmbed = new EmbedBuilder()
            .setColor('#167301')
            .setDescription(`Once you have read and accepted our rules, head over to <#${rolesChannel}> channel to gain access to the rest of the server!`)

            message.reply({
                embeds: [rolesEmbed]
            })
        }
    }
};