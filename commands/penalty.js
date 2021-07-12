const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
const validator = require("../validation/validator");
module.exports = {
  name: "penalty",
  description: "penalty command",
  async execute(bot, message, args) {
    try {
      const server_id = message.guild.id;
      const data = await serverData.findOne({ id: server_id }, { roles: 1 });

      if (validator.role(message, data.roles.bot_admin)) {
        if (args[0] && args[0] !== "remove") {
          if (args.length === 0)
            message.channel.send(`<@${message.author.id}> Mention a member`);
          const time = 6.048e8;
          // const time = 1000;

          const nowTime = new Date().getTime();
          const server_id = message.guild.id;
          const data = await serverData.findOne(
            { id: server_id },
            { penalty_id: 1 }
          );
          const mentToId = (ment) => {
            ment = ment.replace("<", "");
            ment = ment.replace("@", "");
            ment = ment.replace("!", "");
            ment = ment.replace(">", "");
            return ment;
          };
          let penalty_players = [];
          const ment_player = args;

          ment_player.map((pl) => {
            let id = mentToId(pl);
            penalty_players.push(id);
          });

          const addNew = async (id) => {
            let obj = {
              player_id: id,
              time: nowTime + time,
            };
            await serverData.updateOne(
              { id: server_id },
              { $push: { penalty_id: obj } }
            );
          };

          const addExisting = async (d) => {
            let oldTime = parseInt(d.time, 10);
            let newTime = oldTime + nowTime;
            await serverData.updateOne(
              { id: server_id, "penalty_id.player_id": d.player_id },
              { $set: { "penalty_id.$.time": newTime } }
            );
          };

          penalty_players.map(async (id) => {
            if (data.penalty_id.length === 0) {
              //   console.log("not ok");
              await addNew(id);
            } else {
              //   console.log("ok");
              data.penalty_id.map(async (d) => {
                if (d.player_id === id) {
                  //   console.log("ok 2 called");
                  await addExisting(d);
                } else {
                  await addNew(id);
                }
              });
            }
          });

          message.channel.send(`<@${message.author.id}> Updated..`);
        } else if (args[0] && args[0] === "remove") {
          const server_id = message.guild.id;
          // console.log("remove called");
          const mentToId = (ment) => {
            ment = ment.replace("<", "");
            ment = ment.replace("@", "");
            ment = ment.replace("!", "");
            ment = ment.replace(">", "");
            return ment;
          };
          let arr = args;
          let players = [];
          arr.splice(arr.indexOf("remove"), 1);

          arr.map((el) => {
            let player = mentToId(el);
            players.push(player);
          });

          players.map(async (id) => {
            await serverData
              .updateOne(
                { id: server_id },
                { $pull: { penalty_id: { player_id: id } } }
              )
              .then(() => {
                message.channel.send(
                  `<@${message.author.id}> <@${id}> removed from panalty`
                );
              });
          });
        }
      } else {
        message.channel.send(
          `<@${message.author.id}> You don't have permission to run it.`
        );
      }
    } catch (error) {
      errorHandler(message, error);
    }
  },
};
