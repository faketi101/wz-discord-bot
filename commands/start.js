const serverData = require("../models/serverSchema");
const configMatch = require("../helpers/config_match");
const errorHandler = require("../handlers/error_handler");
const teamGenerator = require("../helpers/team_generator");

module.exports = {
  name: "start",
  description: "start command",
  async execute(bot, message, args) {
    try {
      const server_id = message.guild.id;
      const data = await serverData.findOne({ id: server_id });

      const total_reacts = data.total_reacts;
      // teamGenerator(message, null, null, data);

      if (total_reacts.length == data.players) {
        configMatch(message);
        // teamGenerator(message, total_reacts)
      } else {
        message.channel.send("Not enough players.");
      }
    } catch (error) {
      errorHandler(null, error);
    }
  },
};
