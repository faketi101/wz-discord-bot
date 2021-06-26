module.exports = {
  name: "test",
  description: "test command",
  execute(bot, message, args) {
    console.log("Test Commands: \n");
    console.log(message.guild.id);
  },
};
