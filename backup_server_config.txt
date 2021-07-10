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
          var everyoneRole = message.guild.roles.cache.find(
            (r) => r.name === "@everyone"
          );
          var id_obj = {};
          message.guild.roles
            .create({
              data: {
                name: "view_bot_category",
                color: "#00d9fc",
              },
            })
            .then((view_bot_role) => {
              id_obj.view_bot = view_bot_role.id;
            })
            .then(() => {
              message.guild.roles
                .create({
                  data: {
                    name: "view_team_selection",
                    color: "#00d9fc",
                  },
                })
                .then((view_team_selection) => {
                  id_obj.view_team_selection = view_team_selection.id;
                })
                .then(() => {
                  message.guild.roles
                    .create({
                      data: {
                        name: "view_mode_selection",
                        color: "#00d9fc",
                      },
                    })
                    .then((view_mode_selection) => {
                      id_obj.view_mode_selection = view_mode_selection.id;
                    })
                    .then(() => {
                      message.guild.channels
                        .create("Warzone BOT", {
                          type: "category",
                          permissionOverwrites: [
                            {
                              id: everyoneRole.id,
                              deny: ["VIEW_CHANNEL"],
                            },
                            {
                              id: id_obj.view_bot,
                              allow: ["VIEW_CHANNEL"],
                            },
                          ],
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
                                .create("rank", {
                                  type: "text",
                                })
                                .then((ch) => {
                                  // console.log(ch);
                                  ch.setParent(category.id);

                                  // ch.setParent(category.id);
                                  id_obj.rank = ch.id;
                                })
                                .then(() => {
                                  message.guild.channels
                                    .create("team_selection", {
                                      type: "text",
                                      permissionOverwrites: [
                                        {
                                          id: everyoneRole.id,
                                          deny: ["VIEW_CHANNEL"],
                                        },
                                        {
                                          id: id_obj.view_team_selection,
                                          allow: ["VIEW_CHANNEL"],
                                        },
                                      ],
                                    })
                                    .then((team_selection) => {
                                      team_selection.setParent(category.id);
                                      id_obj.team_selection = team_selection.id;
                                    })
                                    .then(() => {
                                      message.guild.channels
                                        .create("mode_selection", {
                                          type: "text",
                                          permissionOverwrites: [
                                            {
                                              id: everyoneRole.id,
                                              deny: ["VIEW_CHANNEL"],
                                            },
                                            {
                                              id: id_obj.view_mode_selection,
                                              allow: ["VIEW_CHANNEL"],
                                            },
                                          ],
                                        })
                                        .then((mode_selection) => {
                                          mode_selection.setParent(category.id);
                                          id_obj.mode_selection =
                                            mode_selection.id;
                                        })
                                        .then(() => {
                                          message.guild.channels
                                            .create("team_waiting", {
                                              type: "voice",
                                            })
                                            .then((team_waiting) => {
                                              team_waiting.setParent(
                                                category.id
                                              );
                                              id_obj.team_waiting =
                                                team_waiting.id;
                                            })
                                            .then(() => {
                                              message.guild.channels
                                                .create("mode_waiting", {
                                                  type: "voice",
                                                })
                                                .then((mode_waiting) => {
                                                  mode_waiting.setParent(
                                                    category.id
                                                  );
                                                  id_obj.mode_waiting =
                                                    mode_waiting.id;
                                                })
                                                .then(async () => {
                                                  await saveData(id_obj);
                                                });
                                            });
                                        });
                                    });
                                });
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
