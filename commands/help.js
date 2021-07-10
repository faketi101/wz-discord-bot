const helpEmbed = require("../embeds/help_embed");
module.exports = {
  name: "help",
  description: "help command",
  execute(bot, message, args, Discord) {
    let embed = helpEmbed(bot, Discord);
    message.channel.send(embed);
  },
};
