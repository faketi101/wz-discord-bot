const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
module.exports = {
  name: "addserver",
  description: "test command",
  async execute(bot, message, args) {
    const server_id = message.guild.id;
    if (!args[0]) {
      return message.channel.send("please enter team command id");
    }
    if (!args[1]) {
      return message.channel.send("please enter parent category id");
    }
    if (!args[2]) {
      return message.channel.send("please enter common lobby id");
    }
    try {
      const checkServerId = await serverData.findOne({ id: server_id });

      if (!checkServerId) {
        let newServer = await serverData.create({
          id: server_id,
          total_reacts: [],
          solo_reacts: [],
          duo_reacts: [],
          trio_reacts: [],
          squad_reacts: [],
          players: null,
          parent_id: args[1],
          channels: {
            team_command: args[0],
            common_lobby: args[2],
          },

          roles: [
            {
              common_lobby: "Common_lobby",
            },
          ],
          penalty_id: [],
        });
        newServer.save().then(() => {
          message.channel.send(
            `<@${message.author.id}> This server has been added`
          );
        });
      }
    } catch (error) {
      errorHandler(message, error);
    }
  },
};
