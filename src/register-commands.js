require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "cadastro",
    description: "Digite seu nome de usuario no star citizen",
    options: [
      {
        name: "nome-de-usuario",
        description: "Seu usuario unico no jogo quando se cadastrou la no site",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// (async () => {
//   try {
//     await rest.put(
//       Routes.applicationGuildCommands(
//         process.env.CLIENT_ID,
//         process.env.GUILD_ID
//       ),
//       { body: commands }
//     );
//     console.log("sucesso");
//   } catch (error) {
//     console.log(error);
//   }
// })();
