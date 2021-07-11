const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");

module.exports = async () => {
  try {
    console.log("Delete Penalty Called");

    const data = await serverData.find({}, { penalty_id: 1, id: 1 });
    let nowTime = new Date().getTime();

    data.map((el) => {
      el.penalty_id.map(async (element) => {
        const time = parseInt(element.time, 10);

        if (time <= nowTime) {
          await serverData.updateOne(
            { id: el.id },
            { $pull: { penalty_id: { player_id: element.player_id } } }
          );
        }
      });
    });
  } catch (error) {
    errorHandler(null, error);
  }
};
