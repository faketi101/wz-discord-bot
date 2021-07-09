const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");

module.exports = async () => {
  try {
    let nowTime = new Date().getTime();
    const pendDelData = await serverData.find({}, { pend_delete: 1, _id: 0 });

    let del_id = [];

    pendDelData.map((el) => {
      el.pend_delete.forEach((element) => {
        const time = parseInt(element.time, 10);
        // console.log(time);
        // console.log(nowTime);
        if (time <= nowTime) {
          del_id.push(element.ch_id);
        }
      });
    });
    console.log(del_id);
  } catch (error) {
    errorHandler(null, error);
  }
};
