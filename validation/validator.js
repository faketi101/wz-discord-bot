const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
module.exports = {
  admin(message) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      return true;
    } else return false;
  },
};
