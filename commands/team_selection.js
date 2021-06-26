const firstMessage = require("../helpers/first_message");
const errorHandler = require("../handlers/error_handler");
const updateData = require("../helpers/database_methods");
const { update } = require("../models/serverSchema");

module.exports = {
  name: "team",
  async execute(bot, message, args, Discord) {
    const channelId = "854999976442331147";
    const server_id = message.guild.id;

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
    del_mess(message, channelId, 7);
    const getEmoji = (emojiName) =>
      bot.emojis.cache.find((emoji) => emoji.name === emojiName);

    const emojis = {
      solo: "SOLO",
      duo: "DUO",
      trio: "TRIO",
      squad: "SQUAD",
    };

    const reactions = [];

    let emojiText = `Add a Reaction to Select Team Mode \n\n`;
    for (const key in emojis) {
      // console.log(key);
      const emoji = getEmoji(key);
      reactions.push(emoji);

      const role = emojis[key];

      emojiText += `${emoji} = ${role}\n\n`;
    }

    firstMessage(bot, channelId, emojiText, reactions, message);

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
        // console.log(member.user.id);
        // member.roles.add(role);\
        try {
          await updateData.save(server_id, "total_reacts", member.user.id);
        } catch (error) {
          errorHandler(message, error);
        }
        // if (roleName === "SND") {
        // } else if (roleName === "HARDPOINT") {
        // } else if (roleName === "DOMINATION") {
        // }
      } else {
        // console.log(member.user);
        // member.roles.remove(role);

        try {
          await updateData.remove(server_id, "total_reacts", member.user.id);
        } catch (error) {
          errorHandler(message, error);
        }

        // if (roleName === "SND") {
        // } else if (roleName === "HARDPOINT") {
        // } else if (roleName === "DOMINATION") {
        // } else {
        // }
        // console.log("removed");
        // console.log(localData.reacted_all_users);
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
  },
};
