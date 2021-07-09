const sendDelete = require("../helpers/send_delete_channel");
const deleteChannel = require("../helpers/delete_channel");
module.exports = {
  name: "test",
  description: "test command",
  async execute(bot, message, args) {
    if (args[0] == 1) {
      try {
        await deleteChannel();
      } catch (error) {
        console.log(error);
      }
    }

    if (args[0] == 2) {
      try {
        await message.guild.channels
          .create("test", {
            type: "category",
          })
          .then((category) => {
            message.guild.channels
              .create("name", {
                type: "voice",
              })
              .then((channel) => {
                channel.setParent(category.id);
                // console.log(category.guild.channels.cache);
                let nowTime = new Date().getTime();
                 sendDelete(message, category.id, nowTime + 10000);
              });
          });
      } catch (error) {
        console.log(error);
      }
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
