const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
module.exports = {
  admin(message) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      return true;
    } else return false;
  },
  role(message, role_id) {
    let role = message.guild.roles.cache.find((rl) => rl.id === role_id);
    let userHas = message.member.roles.cache.find((rl) => rl.id === role_id);
    if (role && userHas) {
      return true;
    } else {
      return false;
    }
  },
};
