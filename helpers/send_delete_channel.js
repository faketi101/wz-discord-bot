const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
module.exports = async (message, id, time) => {
  try {
    const server_id = message.guild.id;
    let obj = {
      ch_id: id,
      time: time,
    };
    await serverData.updateOne(
      { id: server_id },
      { $push: { pend_delete: obj } }
    );
  } catch (error) {
    errorHandler(message, error);
  }
};
