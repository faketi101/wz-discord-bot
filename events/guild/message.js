
module.exports = (Discord, bot, message) => {
  const prefix = process.env.BOT_PREFIX || "<";

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = bot.command.get(cmd);

  // Consoles
  // console.log("command executed:");
  // console.log(command);
  // console.log("\n");

  // console.log("message executed:");
  // console.log(message);
  // console.log("\n");

  // console.log("args executed:");
  // console.log(args);
  // console.log("\n");

  if (command) command.execute(bot, message, args, Discord);
};
