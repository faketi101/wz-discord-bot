const addRole = require("../../helpers/add_role");
const removeRole = require("../../helpers/remove_role");
const servrerData = require("../../models/serverSchema");
const errorHandler = require("../../handlers/error_handler");
const penaltyEmbed = require("../../embeds/penalty_embed");
module.exports = async (Discord, bot, oldVoice, newVoice) => {
  // console.log("called");
  // console.log(newVoice);
  // Defining specific voice channel
  //   console.log(newVoice.channelID);
  try {
    const server_id = newVoice.guild.id;
    const data = await servrerData.findOne(
      { id: server_id },
      { roles: 1, channels: 1, penalty_id: 1 }
    );

    if (data) {
      const common_lobby_id = data.channels.common_lobby;
      const common_lobby_role_id = data.roles.common_lobby;

      let oldvoice = bot.channels.cache.get(oldVoice.channelID);
      let newvoice = bot.channels.cache.get(newVoice.channelID);
      let user = bot.users.cache.get(newVoice.id);
      let player = newVoice.guild.members.cache.find(
        (usr) => usr.id === newVoice.id
      );
      // common lobby roles
      if (
        newVoice.channelID === common_lobby_id ||
        oldVoice.channelID === common_lobby_id
      ) {
        if (newvoice) {
          // console.log("Joined common");
          // console.log(user.id);
          data.penalty_id.map((el) => {
            if (newVoice.id === el?.player_id) {
              // console.log(player.voice);
              // console.log(newvoice.kick(player));
              let embed = penaltyEmbed(newVoice, Discord, bot, el, user);
              user.send(embed);

              newVoice.kick();
            }
          });
          addRole(newVoice, user.id, common_lobby_role_id);

          // console.log("==========call time=========");
        }
        if (oldvoice && !newvoice) {
          // console.log("left common");
          // console.log(user.id);
          removeRole(newVoice, user.id, common_lobby_role_id);
        }
      }
      if (oldvoice && !newvoice) {
        // console.log("left common");
        // console.log(user.id);
        removeRole(newVoice, user.id, common_lobby_role_id);
      }
    }
  } catch (error) {
    errorHandler(null, error);
  }
};
