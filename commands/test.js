const sendDelete = require("../helpers/send_delete_channel");
const deleteChannel = require("../helpers/delete_channel");
const serverData = require("../models/serverSchema");
const Discord = require("discord.js");
module.exports = {
  name: "test",
  description: "test command",
  async execute(bot, message, args) {
    if (args[0] === 1) {
      try {
        await deleteChannel(bot);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0] == 2) {
      try {
        message.guild.channels
          .create("test", {
            type: "category",
            permissionsOverwrites: [
              {
                id: "843509310637080607",
                // deny: ['MANAGE_MESSAGES'],
                // allow: ['SEND_MESSAGES']
                roles: ["843509310637080607"],
                private: true,
              },
            ],
          })
          .then((category) => {
            message.guild.channels
              .create("name", {
                type: "voice",
                parent: category,
              })
              .then((channel) => {
                // channel.setParent(category.id);
                // console.log(category.guild.channels.cache);
                let nowTime = new Date().getTime();
                sendDelete(message, category.id, nowTime + 20000);
                sendDelete(message, channel.id, nowTime + 20000);
              });
          });
      } catch (error) {
        console.log(error);
      }
    } else if (args[0] == 3) {
      const server = bot.guilds.cache.find(
        (server) => server.id == message.guild.id
      );

      const channel = server.channels.cache.get(message.channel.id);
      // console.log(channel);
    } else if (args[0] == 4) {
      let p = args[1];
      p = p?.replace("<", "");
      p = p?.replace("@", "");
      p = p?.replace(">", "");
      p = p?.replace("!", "");

      let embed = new Discord.MessageEmbed()
        .setTitle("Test")
        .setThumbnail(
          args[1]
            ? message.mentions.users.first().avatarURL({ dynamic: true })
            : message.author.avatarURL()
        );
      message.channel.send(embed);
    } else if (args[0] == 5) {
      async function deleteServer(message) {
        const server_id = message.guild.id;

        let data = await serverData.findOne({ id: server_id });
        if (data) {
          console.log(data.channels);
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
        } else message.channel.send("This server is not initialized yet!");
      }
      deleteServer(message);
    } else if (args[0] == 6) {
      // var everyoneRole = message.guild.roles.cache.find(
      //   (r) => r.name === "@everyone"
      // );
      console.log(
        message.member.roles.cache.find((rl) => rl.id === "863832191804375118")
      );
    }
  },
};
