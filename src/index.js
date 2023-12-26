const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ComponentType,
  ChannelType,
} = require("discord.js");
require("dotenv").config();

const keep_alive = require("./keep_alive.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env["TOKEN"]);
console.log("Bot iniciado");

client.on("messageCreate", async (message) => {
  const canalCadastro = "770497261335216148";
  const canalSTKgraduacao = "1187810317804244992";

  if (message.channel.id === canalCadastro) {
    const URL_BASE = "https://robertsspaceindustries.com/citizens/";
    const isLinkValid = message.content.includes(URL_BASE);
    const roleMember = "770496818555387914";

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
        console.error(`Cadastro falhou ${user[1]}! error: ${e.toString()}`);
        message.reply(
          `Cadastro falhou, tente novamente ${user[1]}! error: ${e.toString()}`
        );
      } finally {
        message.reply(`Cadastro concluído ${user[1]}, bem-vindo a EliteBR!`);
        console.log(`Cadastro concluido ${user[1]}, bem-vindo a EliteBR!`);
      }
      // await message.member.setNickname(user[1]);
    }
  }

  if (message.channel.id === canalSTKgraduacao) {
    const roleSTK = "798975316617330728";

    if (message.author.bot) return;

    // if (message.content !== "bot_stk") return;

    console.log("bot stk solicitado");

    const button_stk1 = new ButtonBuilder()
      .setCustomId("treino_stk1")
      .setLabel("Treino Piloto")
      .setStyle(ButtonStyle.Primary);
    const button_stk2 = new ButtonBuilder()
      .setCustomId("treino_stk2")
      .setLabel("Treino Soldado")
      .setStyle(ButtonStyle.Primary);

    const button = new ActionRowBuilder().addComponents(
      button_stk1,
      button_stk2
    );

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(
        "Clique abaixo para solicitar o treino básico e se tornar membro STRYKER"
      );

    const reply = await message.reply({
      embeds: [embed],
      components: [button],
    });

    const filter = (i) => i.user.id === message.author.id;

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "treino_stk1") {
        const channel = interaction.channel;
        const user = interaction.user;
        const userName = user.username;
        const threadName = "treino-piloto-" + userName;
        console.log("treino-piloto solicitado", user);

        try {
          const threadChannel = await channel.threads.create({
            name: threadName,
            autoArchiveDuration: 60,
            reason: "na",
            type: ChannelType.PublicThread,
          });

          await threadChannel.members.add(user);

          interaction.reply(
            `Treino de Piloto solicitado por ${userName}! Atenção <@&${roleSTK}>, aguardamos algum voluntário entrar no topico acima para passar instruções ou agendar um horário.`
          );
        } catch (error) {
          console.log(error);
        }
      }

      if (interaction.customId === "treino_stk2") {
        const channel = interaction.channel;
        const user = interaction.user;
        const userName = user.username;
        const threadName = "treino-soldado-" + userName;
        console.log("treino-soldado solicitado", user);

        try {
          const threadChannel = await channel.threads.create({
            name: threadName,
            autoArchiveDuration: 60,
            reason: "na",
            type: ChannelType.PublicThread,
          });

          await threadChannel.members.add(user);

          interaction.reply(
            `Treino de Soldado solicitado por ${userName}! Atenção <@&${roleSTK}>, aguardamos algum voluntário entrar no topico acima para passar instruções ou agendar um horário.`
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
});

// const message = await interaction.reply({
//   content: `Chamando <@&${roleSTK}> `,
//   fetchReply: true,
// });
// const thread = await message.startThread();

// if (!message.author.bot && !message.system) {
//   message.reply(
//     "Este canal é apenas para cadastro neste servidor do Discord! Envie o link do seu usuário conforme este passo-a-passo: https://discord.com/channels/705811068110372875/770497261335216148/975503620193792061"
//   );
// }

//criar botao

// const thread = await channel.threads.create({
//   name: 'food-talk',
//   autoArchiveDuration: 60,
//   reason: 'Needed a separate thread for food',
// });

//criar topico e marcar STK

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "cadastro") {
//     const name = interaction.options.get("nome-de-usuario");
//     const roleMember = "770496818555387914";

//     if (!name) {
//       interaction.reply(
//         "Precisa selecionar o nome-de-usuario e digitar seu usuario ÚNICO no star citizen"
//       );
//     } else {
//       await interaction.member.roles.add(roleMember);
//       // await interaction.member.setNickname(name.value);
//       interaction.reply(`Cadastrado ${name.value}, bem-vindo a EliteBR!`);
//     }
//   }
// });
