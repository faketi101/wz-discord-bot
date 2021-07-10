const serverData = require("../models/serverSchema");
const errorHandler = require("../handlers/error_handler");
const validation = require("../validation/validator");
const changePrefix = require("../helpers/change_prefix");
module.exports = {
  name: "server",
  description: "server commands",
  async execute(bot, message, args, Discord) {
    // console.log(validation.admin(message));
    if (validation.admin(message)) {
      const server_id = message.guild.id;

      if (args[0] == "init") {
        try {
          let data = await serverData.findOne({ id: server_id });

          if (!data) {
            createChanneles(message);
          } else {
            message.channel.send("This server already added!");
          }
        } catch (error) {
          errorHandler(message, error);
        }
      } else if (args[0] == "delete") {
        await deleteServer(message);
      } else if (args[0] == "prefix") {
        if (args[1]) {
          await changePrefix(message, args[1], bot, Discord);
        } else {
          message.channel.send(
            `<@${message.author.id}> Invalid command syntax.`
          );
        }
      }

      async function saveData(obj) {
        let newServer = await serverData.create({
          id: server_id,
          prefix: null,
          total_reacts: [],
          solo_reacts: [],
          duo_reacts: [],
          trio_reacts: [],
          squad_reacts: [],
          players: null,
          channels: {
            team_command: obj.team_mode_selection,
            common_lobby: obj.waiting_lobby,
            parent: obj.parent,
            commands: obj.commands,
          },

          roles: {
            common_lobby: obj.view_waiting,
          },

          penalty_id: [],
        });
        newServer.save().then(() => {
          message.channel.send(
            `<@${message.author.id}> This server has been added`
          );
        });
      }

      async function createChanneles(message) {
        try {
          var id_obj = {};
          message.guild.channels
            .create("Warzone BOT", {
              type: "category",
            })
            .then((category) => {
              message.guild.channels
                .create("commands", {
                  type: "text",
                })
                .then((ch_1) => {
                  ch_1.setParent(category.id);
                  id_obj.commands = ch_1.id;
                  id_obj.parent = category.id;
                })
                .then(() => {
                  message.guild.channels
                    .create("team_mode_selection", {
                      type: "text",
                    })
                    .then((ch_2) => {
                      ch_2.setParent(category.id);
                      id_obj.team_mode_selection = ch_2.id;
                    })
                    .then(() => {
                      message.guild.channels
                        .create("waiting_lobby", {
                          type: "voice",
                        })
                        .then((ch_3) => {
                          ch_3.setParent(category.id);
                          id_obj.waiting_lobby = ch_3.id;
                        })
                        .then(() => {
                          message.guild.roles
                            .create({
                              data: {
                                name: "view_waiting",
                                color: "#00d9fc",
                              },
                            })
                            .then((role_1) => {
                              id_obj.view_waiting = role_1.id;
                            })
                            .then(async () => {
                              await saveData(id_obj);
                            });
                        });
                    });
                });
            });
        } catch (error) {
          errorHandler(message, error);
        }
      }

      async function deleteServer(message) {
        try {
          const server_id = message.guild.id;

          let data = await serverData.findOne({ id: server_id });
          if (data) {
            // console.log(data.channels[0]);

            for (var key in data.channels) {
              if (data.channels.hasOwnProperty(key)) {
                if (data.channels[key] !== true) {
                  let channel = message.guild.channels.cache.find(
                    (ch) => (ch.id = data.channels[key])
                  );
                  // console.log(data.channels[key]);
                  channel.delete();
                }
              }
            }

            for (var key in data.roles) {
              if (data.roles.hasOwnProperty(key)) {
                if (data.roles[key] !== true) {
                  let role = message.guild.roles.cache.find(
                    (ch) => (ch.id = data.roles[key])
                  );
                  // console.log(data.channels[key]);
                  role.delete();
                }
              }
            }

            data.pend_delete.map((el) => {
              let channel = message?.guild?.channels?.cache?.find(
                (ch) => ch?.id == el?.ch_id
              );

              if (channel) {
                channel.delete();
              }
            });

            await serverData.deleteOne({ id: server_id }).then(() => {
              message.channel.send(
                `This server has been deleted by <@${message.author.id}>`
              );
            });
          } else message.channel.send("This server is not initialized yet!");
        } catch (error) {
          errorHandler(message, error);
        }
      }
    } else {
      message.channel.send(
        `<@${message.author.id}> you don't have permission to run this command`
      );
    }
  },
};
