const errorHandler = require("../handlers/error_handler");

module.exports = async (message, c_id, name, teams) => {
  // console.log(c_id);
  try {
    await message.guild.channels
      .create(name, {
        type: "category",
      })
      .then((channel) => {
        teams.map(async (element, index) => {
          await message.guild.channels
            .create(element.name, {
              type: "voice",
            })
            .then((channels) => {
              channels.setParent(channel.id);
            });
        });
      });
  } catch (error) {
    errorHandler(message, error);
  }
};
