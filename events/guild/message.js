const errorHandler = require("../../handlers/error_handler");
const serverData = require("../../models/serverSchema");
const firstEmbed = require("../../embeds/first_embed");
module.exports = async (Discord, bot, message) => {
  try {
    const server_id = message?.guild?.id;
    const data = await serverData.findOne(
      { id: server_id },
      { channels: 1, prefix: 1 }
    );
    const message_parent = message?.channel?.parent?.id;
    const server_parent = data?.channels?.parent;
    const server_prefix = data?.prefix;
    const prefix = server_prefix || "-";

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = bot.command.get(cmd);

    // Consoles
    // console.log("command executed:");
    // console.log(command);
    // console.log("\n");yy

    // console.log("message executed:");
    // console.log(message);
    // console.log("\n");

    // console.log("args executed:");
    // console.log(args);
    // console.log("\n");
    // console.log(command);

    if (command) {
      // if (message.author.id === "858029050425638972") return;
      if (command.name === "server" || command.name === "invite") {
        command.execute(bot, message, args, Discord);
      } else if (data && message_parent !== server_parent) {
        return;
      } else if (data && message_parent === server_parent) {
        command.execute(bot, message, args, Discord);
      } else {
        const embed = firstEmbed(message, Discord, bot);
        message.channel.send(embed);
      }
    }
  } catch (error) {
    errorHandler(message, error);
  }
};
