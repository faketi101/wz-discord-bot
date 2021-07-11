const validation = require("../validation/validator");
const errorHandler = require("../handlers/error_handler");
module.exports = {
  name: "clear",
  description: "clear command",
  async execute(bot, message, args) {
    // console.log(args);

    if (validation.admin(message)) {
      if (!args[0]) args[0] = 5;
      if (isNaN(args[0])) return message.reply("please enter number");
      if (args[0] > 100) return message.reply("please enter lower than 100");
      if (args[0] < 1) return message.reply("please enter greater than 0");

      try {
        await message.channel.messages
          .fetch({ limit: args[0] })
          .then((messages) => {
            message.channel.bulkDelete(messages);
          });
      } catch (error) {
        errorHandler(message, error);
      }
    } else
      message.channel.send(
        `<@${message.author.id}> You don't have permission.`
      );
  },
};
