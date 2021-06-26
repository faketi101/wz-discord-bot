const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
module.exports = {
  async save(server_id, array_k, id) {
    try {
      let match = new Object();
      match.name = array_k;
      match.id = id;
      console.log(match);
      await serverData.updateOne({ id: server_id }, { $addToSet: { match } });
    } catch (error) {
      errorHandler(null, error);
    }
  },
  async remove(server_id, array, id) {
    try {
      await serverData.updateOne(
        { id: server_id },
        { $pull: { total_reacts: id } }
      );
    } catch (error) {
      errorHandler(null, error);
    }
  },
};
