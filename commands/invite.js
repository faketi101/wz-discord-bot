const { DiscordAPIError } = require("discord.js");

module.exports = {
  name: "invite",
  description: "invite command",
  execute(bot, message, args, Disocrd) {
//     console.log(bot);
    let embed = new Disocrd.MessageEmbed()
      .setColor("#00ff00")
      .setTitle(`${bot.user.username}'s Invite link\n`)
      .addField(
        "Administrator Invitation:",
        "https://discord.com/api/oauth2/authorize?client_id=858029050425638972&permissions=8&scope=bot\n",
        false
      )
      .addField("Developer:", "Snowden#0861", false)
      .setThumbnail(bot.user.displayAvatarURL());
    message.channel.send(embed);
  },
};
