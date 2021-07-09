const errorHandler = require("../handlers/error_handler");
module.exports = (message, chArr, teams) => {
  try {
    async function setVoice(c_id, p_id) {
      let player = message.guild.members.cache.find((usr) => usr.id === p_id);
      let channel = message.guild.channels.cache.find(
        (channel) => channel.id === c_id
      );

      if (!player) {
        console.log(`${p_id} not found`);
      }

      if (!player.voice.channel) {
        console.log(`${p_id} not in voice channel`);
      } else {
        player.voice.setChannel(channel);
      }
    }
    teams.map((element, index) => {
      // console.log("element");
      // console.log(element);
      element.player.map((id) => {
        // console.log("called");
        setVoice(chArr[index].id, id);

        // if (element.name == chArr.name) {
        //   console.log("called");
        //   setVoice(chArr.id, id);
        // }
      });
    });
  } catch (error) {
    errorHandler(message, error);
  }
  // console.log("ch arr");
  // console.log(chArr);
};
