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
const URL_BASE = "https://robertsspaceindustries.com/citizens/";
const roleMember = "770496818555387914";

client.login(process.env.TOKEN);

client.on("messageCreate", async (message) => {
  const isLinkValid = message.content.includes(URL_BASE);

  if (message.channel.id === "770497261335216148") {
    if (!message.author.bot && !isLinkValid && !message.system) {
      message.reply(
        "Este canal é apenas para cadastro neste servidor do Discord! Envie o link do seu usuário conforme este passo-a-passo: https://discord.com/channels/705811068110372875/770497261335216148/975503620193792061"
      );
    }
    if (isLinkValid) {
      const url_user = message.content;
      const user = url_user.split("/citizens/");
      try {
        await message.member.roles.add(roleMember);
      } catch (e) {
        console.error(`Cadastro falhou ${user[1]}`);
        message.reply(`Cadastro falhou, tente novamente ${user[1]}!`);
      } finally {
        message.reply(`Cadastro concluído ${user[1]}, bem-vindo a EliteBR!`);
        console.log(`Cadastro concluido ${user[1]}, bem-vindo a EliteBR!`);
      }
      // await message.member.setNickname(user[1]);
    }
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
      // await interaction.member.setNickname(name.value);
      interaction.reply(`Cadastrado ${name.value}, bem-vindo a EliteBR!`);
    }
  }
});
