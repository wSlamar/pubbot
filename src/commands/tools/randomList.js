const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pub-list")
        .setDescription("Returns a random list based on what is input")
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
        .addStringOption((option) => option
            .setName("input-list")
            .setDescription("List of input text. Must be semicolon delimited for text or semicolon + space delmited for mentions.")
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName("output-number")
            .setDescription("How many items from the list you would like output")
            .setRequired(true)
        ),
    async execute(interaction, client) {
        console.log('\x1b[36m','/pub-list has been kicked off','\x1b[0m')
        const inputList = interaction.options.getString("input-list");
        const outputNumber = interaction.options.getInteger("output-number").toString();
        const listArray = inputList.split(";")
        let randomShuffleArray;
        const fixFormatArray = ['5', '8', '11', '14', '17', '20', '23', '26']

        const listEmbed = new EmbedBuilder()
            .setColor('#167301')
            .setThumbnail('https://i.imgur.com/hYuwLn9.png')
            .setTitle(`MOJITOS RANDOM LIST`)
            .setDescription(`Here is the random list that I have generated for you based on the input values that you have given me!`)

        function shuffle(array) {
            let currentIndex = listArray.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            randomShuffleArray = array;
        }

        shuffle(listArray);

        for (var i = 0; i < outputNumber; i++) {
            if (fixFormatArray.includes(outputNumber) && i == outputNumber - 1) {
                listEmbed.addFields({
                    name: ` `,
                    value: `${i + 1}.) ${randomShuffleArray[i]}`,
                    inline: true,
                }, {
                    name: '\u200b',
                    value: ` `,
                    inline: true,
                })
            } else {
                listEmbed.addFields({
                    name: ` `,
                    value: `${i + 1}.) ${randomShuffleArray[i]}`,
                    inline: true,
                })
            }
        }

        if (outputNumber > listArray.length) {
            const numberErrorEmbed = new EmbedBuilder()
                .setTitle('OUTPUT NUMBER ERROR')
                .setColor('#167301')
                .setDescription('🔸 The output number that you have provided is larger than the input list\n🔸 The `input-list` must be greater than or equal to the `output-number`')

            const message = await interaction.reply({
                embeds: [numberErrorEmbed],
                ephemeral: true
            })
        } else {
            const message = await interaction.reply({
                embeds: [listEmbed],
            })
        }
    }
};
