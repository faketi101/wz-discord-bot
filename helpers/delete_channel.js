const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");

module.exports = async (bot) => {
  console.log("Delete Channel Called");
  try {
    let nowTime = new Date().getTime();
    const pendDelData = await serverData.find(
      {},
      { pend_delete: 1, id: 1, _id: 0 }
    );

    let del_id = [];

    // searching delete channel id and server
    pendDelData.map((el) => {
      el.pend_delete.forEach((element) => {
        const time = parseInt(element.time, 10);
        // console.log(time);
        // console.log(nowTime);
        if (time <= nowTime) {
          let obj = {
            id: el.id,
            ch_id: element.ch_id,
          };
          del_id.push(obj);
        }
      });
    });
    // console.log(del_id);

    // deleting delete channel id and server
    del_id.forEach(async (el) => {
      const server = bot.guilds.cache.find((server) => server.id == el.id);

      var channel;
      if (server) {
        channel = server.channels.cache.get(el.ch_id);
        // await serverData.updateOne(
        //   { id: el.id },
        //   { $pull: { pend_delete: { ch_id: el.ch_id } } }
        // );
      }

      if (channel) {
        channel.delete();
        await serverData.updateOne(
          { id: el.id },
          { $pull: { pend_delete: { ch_id: el.ch_id } } }
        );
      }
    });
  } catch (error) {
    errorHandler(null, error);
  }
};
