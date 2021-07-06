const errorHandler = require("../handlers/error_handler");
const setVoice = require("./set_voice");
module.exports = async (message, c_id, name, teams) => {
  // console.log(c_id);
  let setChannelArr = [];
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
              let obj = {
                name: channels.name,
                id: channels.id,
              };
              setChannelArr.push(obj);
              if (setChannelArr.length === teams.length) {
                // console.log(setChannelArr);
                setVoice(message, setChannelArr, teams)
              }
            });
        });
      });
  } catch (error) {
    errorHandler(message, error);
  }
};
