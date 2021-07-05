const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
module.exports = {
  async save(server_id, array, id) {
    // console.log(array);
    try {
      if (array === "total_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $addToSet: { total_reacts: id } }
        );
      } else if (array === "solo_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $addToSet: { solo_reacts: id } }
        );
      } else if (array === "duo_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $addToSet: { duo_reacts: id } }
        );
      } else if (array === "trio_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $addToSet: { trio_reacts: id } }
        );
      } else if (array === "squad_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $addToSet: { squad_reacts: id } }
        );
      }
    } catch (error) {
      errorHandler(null, error);
    }
  },
  async remove(server_id, array, id) {
    try {
      if (array === "total_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $pull: { total_reacts: id } }
        );
      } else if (array === "solo_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $pull: { solo_reacts: id } }
        );
      } else if (array == "duo_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $pull: { duo_reacts: id } }
        );
      } else if (array === "trio_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $pull: { trio_reacts: id } }
        );
      } else if (array === "squad_reacts") {
        await serverData.updateOne(
          { id: server_id },
          { $pull: { squad_reacts: id } }
        );
      }
    } catch (error) {
      errorHandler(null, error);
    }
  },
};
