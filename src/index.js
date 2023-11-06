const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.TOKEN);

client.on("messageCreate", (message) => {
  if (message.channel.id === "770497261335216148") {
    if (!message.author.bot) {
      message.reply(
        "Este canal é para cadastro neste servidor discord apenas! Digite abaixo o comando: /cadastro"
      );
    }
    // if (message.content === "usuario:") {
    //   message.reply("Cadastrado!");
    // }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "cadastro") {
    const name = interaction.options.get("nome-de-usuario");
    const roleMember = "770496818555387914";

    if (!name) {
      interaction.reply(
        "Precisa selecionar o nome-de-usuario e digitar seu usuario ÚNICO no star citizen"
      );
    } else {
      await interaction.member.roles.add(roleMember);
      await interaction.member.setNickname(name.value);
      interaction.reply(`Cadastrado ${name.value}, bem-vindo a EliteBR!`);
    }
  }
});
