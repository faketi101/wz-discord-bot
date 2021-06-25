module.exports = {
  name: "ping",
  description: "ping command",
  execute(bot, message, args) {
    message.channel.send("pong");
  },
};
