const firstMessage = require("../helpers/first_message");
const errorHandler = require("../handlers/error_handler");
const updateData = require("../helpers/database_methods");
const serverData = require("../models/serverSchema");

module.exports = {
  name: "team",
  async execute(bot, message, args, Discord) {
    try {
      var server_id = message.guild.id;
      var data = await serverData.findOne({ id: server_id });
      var channelId = data.channels.team_command;
      // const channelId = "861969202084446238";
      console.log(channelId);
    } catch (error) {
      errorHandler(message, error);
    }
    const del_mess = async (message, id, limit) => {
      try {
        let channel = message.guild.channels.cache.find((ch) => ch.id == id);
        await channel.messages.fetch({ limit: limit }).then((messages) => {
          message.channel.bulkDelete(messages);
        });
      } catch (error) {
        errorHandler(message, error);
      }
    };
    await del_mess(message, channelId, 10).then(async () => {
      await updateData.reset(server_id);

      const getEmoji = (emojiName) =>
        bot.emojis.cache.find((emoji) => emoji.name === emojiName);

      // console.log(Number.isInteger(parseInt(args[0], 10)));
      if (args[0] && !Number.isInteger(parseInt(args[0], 10))) {
        return message.channel.send(`Please enter valid integer`);
      }
      //saving basics
      if (args[0] && Number.isInteger(parseInt(args[0], 10))) {
        await updateData.save(server_id, "players", args[0]);
      } else {
        await updateData.save(server_id, "players", 20);
      }

      const emojis = {
        solo: "SOLO",
        duo: "DUO",
        trio: "TRIO",
        squad: "SQUAD",
      };

      const reactions = [];

      let emojiText = `Add a Reaction to Select Team Mode ${
        args[0] ? args[0] : 20
      } Players to start match \n\n`;
      for (const key in emojis) {
        // console.log(key);
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];

        emojiText += `${emoji} = ${role}\n\n`;
      }

      await firstMessage(bot, channelId, emojiText, reactions, message);

      const handleReaction = async (reaction, user, add) => {
        if (
          user.id === "858029050425638972" ||
          user.id === "845882438814269441"
        ) {
          return;
        }

        const emoji = reaction._emoji.name;

        const { guild } = reaction.message;

        const roleName = emojis[emoji];
        // if (!roleName) {
        //   return;
        // }
        const role = guild.roles.cache.find((role) => role.name === roleName);
        const member = guild.members.cache.find(
          (member) => member.id === user.id
        );

        // =========================================
        // =========================================
        // =========================================

        if (add) {
          // console.log(roleName);
          // member.roles.add(role);\
          try {
            await updateData
              .save(server_id, "total_reacts", member.user.id)
              .then(async () => {
                if (roleName === "SOLO") {
                  await updateData.save(
                    server_id,
                    "solo_reacts",
                    member.user.id
                  );
                } else if (roleName === "DUO") {
                  await updateData.save(
                    server_id,
                    "duo_reacts",
                    member.user.id
                  );
                } else if (roleName === "TRIO") {
                  await updateData.save(
                    server_id,
                    "trio_reacts",
                    member.user.id
                  );
                } else if (roleName === "SQUAD") {
                  await updateData.save(
                    server_id,
                    "squad_reacts",
                    member.user.id
                  );
                }
              });
          } catch (error) {
            errorHandler(message, error);
          }
        } else {
          // console.log(member.user);
          // member.roles.remove(role);

          try {
            await updateData
              .remove(server_id, "total_reacts", member.user.id)
              .then(async () => {
                if (roleName === "SOLO") {
                  await updateData.remove(
                    server_id,
                    "solo_reacts",
                    member.user.id
                  );
                } else if (roleName === "DUO") {
                  await updateData.remove(
                    server_id,
                    "duo_reacts",
                    member.user.id
                  );
                } else if (roleName === "TRIO") {
                  await updateData.remove(
                    server_id,
                    "trio_reacts",
                    member.user.id
                  );
                } else if (roleName === "SQUAD") {
                  await updateData.remove(
                    server_id,
                    "squad_reacts",
                    member.user.id
                  );
                }
              });
          } catch (error) {
            errorHandler(message, error);
          }
        }
      };

      bot.on("messageReactionAdd", (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
          handleReaction(reaction, user, true);
          // console.log(reaction);
        }
      });

      bot.on("messageReactionRemove", (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
          handleReaction(reaction, user, false);
        }
      });
    });
  },
};
