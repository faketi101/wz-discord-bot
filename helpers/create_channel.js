const errorHandler = require("../handlers/error_handler");
const setVoice = require("./set_voice");
const deleteChannel = require("./send_delete_channel");
module.exports = async (message, name, teams) => {
  // console.log(c_id);
  let setChannelArr = [];
  try {
    await message.guild.channels
      .create(name, {
        type: "category",
      })
      .then((category) => {
        deleteChannel(message, category.id, new Date().getTime() + 3600000);

        teams.map(async (element, index) => {
          await message.guild.channels
            .create(element.name, {
              type: "voice",
            })
            .then((channels) => {
              channels.setParent(category.id);
              let obj = {
                name: channels.name,
                id: channels.id,
              };
              setChannelArr.push(obj);
              let nowTime = new Date().getTime();
              deleteChannel(message, channels.id, nowTime + 3600000);
              if (setChannelArr.length === teams.length) {
                // console.log(setChannelArr);
                setVoice(message, setChannelArr, teams);
              }
            });
        });
      });
  } catch (error) {
    errorHandler(message, error);
  }
};
