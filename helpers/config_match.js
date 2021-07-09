const teamGenerator = require("./team_generator");
const serverData = require("../models/serverSchema");

const errorHandler = require("../handlers/error_handler");
module.exports = async (message) => {
  const server_id = message.guild.id;
  function getMatchID() {
    let randomNumber = new Date().getTime();
    let id = `M${randomNumber}`;
    return id;
  }

  try {
    const data = await serverData.findOne({ id: server_id });

    let mode;
    // selecting mode
    const sr = data.solo_reacts.length;
    const dr = data.duo_reacts.length;
    const tr = data.trio_reacts.length;
    const sqr = data.squad_reacts.length;

    if (sr > dr && sr > tr && sr > sqr) {
      mode = "SOLO";
    } else if (dr > sr && dr > tr && dr > sqr) {
      mode = "DUO";
    } else if (tr > sr && tr > dr && tr > sqr) {
      mode = "TRIO";
    } else if (sqr > sr && sqr > dr && sqr > tr) {
      mode = "SQUAD";
    }

    const matchID = getMatchID();
    // console.log(matchID);
    teamGenerator(message, mode, data.total_reacts, data, matchID);
  } catch (error) {
    errorHandler(null, error);
  }
};
