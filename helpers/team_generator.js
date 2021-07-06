const createChannel = require("../helpers/create_channel");

module.exports = (message, mode, ids, allData, matchId) => {
  mode = "SQUAD";
  ids = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010"];
  //   const total_player = ids.length;

  let teams = [];

  if (mode == "SOLO") {
    ids.map((element, index) => {
      let obj = {
        name: `team_${index}`,
        player: [element],
      };
      teams.push(obj);
    });
  } else if (mode == "DUO") {
    let loc_array = ids;
    let teamNumber = 0;
    while (loc_array.length > 0) {
      let obj = {
        name: `team_${teamNumber}`,
        player: [loc_array[0], loc_array[loc_array.length - 1]],
      };
      teams.push(obj);
      loc_array.splice(0, 1);
      loc_array.splice(loc_array.length - 1, 1);
      teamNumber += 1;
    }
    // console.log(teams);
  } else if (mode == "TRIO") {
    let loc_array = ids;
    let teamNumber = 0;
    while (loc_array.length > 0) {
      let obj;
      if (loc_array.length > 2) {
        obj = {
          name: `team_${teamNumber}`,
          player: [
            loc_array[0] ? loc_array[0] : null,
            loc_array[1] ? loc_array[1] : null,
            loc_array[loc_array.length - 1]
              ? loc_array[loc_array.length - 1]
              : null,
          ],
        };
      } else if (loc_array.length == 2) {
        obj = {
          name: `team_${teamNumber}`,
          player: [
            loc_array[0] ? loc_array[0] : null,
            loc_array[1] ? loc_array[1] : null,
          ],
        };
      } else if (loc_array.length == 1) {
        obj = {
          name: `team_${teamNumber}`,
          player: [loc_array[0] ? loc_array[0] : null],
        };
      }
      teams.push(obj);
      loc_array.splice(0, 2);
      //   loc_array.splice(1, 1);
      loc_array.splice(loc_array.length - 1, 1);
      teamNumber += 1;
    }
    // console.log(teams);
  } else if (mode == "SQUAD") {
    let loc_array = ids;
    let teamNumber = 0;
    while (loc_array.length > 0) {
      let obj;
      if (loc_array.length > 3) {
        obj = {
          name: `team_${teamNumber}`,
          player: [
            loc_array[0] ? loc_array[0] : null,
            loc_array[1] ? loc_array[1] : null,
            loc_array[loc_array.length - 2]
              ? loc_array[loc_array.length - 2]
              : null,
            loc_array[loc_array.length - 1]
              ? loc_array[loc_array.length - 1]
              : null,
          ],
        };
      } else if (loc_array.length == 3) {
        obj = {
          name: `team_${teamNumber}`,
          player: [
            loc_array[0] ? loc_array[0] : null,
            loc_array[1] ? loc_array[1] : null,
            loc_array[3] ? loc_array[3] : null,
          ],
        };
      } else if (loc_array.length == 2) {
        obj = {
          name: `team_${teamNumber}`,
          player: [
            loc_array[0] ? loc_array[0] : null,
            loc_array[1] ? loc_array[1] : null,
          ],
        };
      } else if (loc_array.length == 1) {
        obj = {
          name: `team_${teamNumber}`,
          player: [loc_array[0] ? loc_array[0] : null],
        };
      }
      teams.push(obj);
      loc_array.splice(0, 2);
      //   loc_array.splice(1, 1);
      loc_array.splice(loc_array.length - 2, 2);
      teamNumber += 1;
    }
  }
  console.log(teams);
  console.log(allData.parent_id);
  console.log(matchId);
  // teams.map(async (element, index) => {
  //   await createChannel(message, allData.parent_id, element.name, "voice");
  // });

  function getMatchID() {
    let randomNumber = new Date().getTime();
    let id = `M${randomNumber}`;
    return id;
  }

  createChannel(message, allData.parent_id, getMatchID(), teams);

  return teams;
};
