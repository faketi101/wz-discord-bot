const errorHandler = require("../handlers/error_handler");
const serverData = require("../models/serverSchema");
const firstEmbed = require("../embeds/first_embed");

module.exports = async (message, prefix, bot, Discord) => {
  try {
    const server_id = message.guild.id;
    const data = await serverData.findOne({ id: server_id });

    if (data) {
      await serverData
        .updateOne({ id: server_id }, { $set: { prefix: prefix } })
        .then(() => {
          message.channel.send(
            `<@${message.author.id}> server prefix has been changed to ${prefix}`
          );
        });
    } else {
      let embed = firstEmbed(message, Discord, bot);
      message.channel.send(embed);
    }
  } catch (error) {
    errorHandler(message, error);
  }
};
