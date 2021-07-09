const sendDelete = require("../helpers/send_delete_channel");
const deleteChannel = require("../helpers/delete_channel");
module.exports = {
  name: "test",
  description: "test command",
  async execute(bot, message, args) {
    if (args[0] == 1) {
      try {
        await deleteChannel(bot);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0] == 2) {
      try {
        message.guild.channels
          .create("test", {
            type: "category",
          })
          .then((category) => {
            message.guild.channels
              .create("name", {
                type: "voice",
                parent: category,
              })
              .then((channel) => {
                // channel.setParent(category.id);
                // console.log(category.guild.channels.cache);
                let nowTime = new Date().getTime();
                sendDelete(message, category.id, nowTime + 20000);
                sendDelete(message, channel.id, nowTime + 20000);
              });
          });
      } catch (error) {
        console.log(error);
      }
    } else if (args[0] == 3) {
      const server = bot.guilds.cache.find(
        (server) => server.id == message.guild.id
      );

      const channel = server.channels.cache.get(message.channel.id);
      console.log(channel);
    }
    // try {
    //   // console.log(args[0]);
    //   const channel = await message.guild.channels.cache.find(
    //     (chnl) => chnl.id == args[0]
    //   );
    //   console.log(channel);
    // } catch (error) {
    //   console.log(error);
    // }
  },
};
