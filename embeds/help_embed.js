module.exports = (bot, Discord) => {
  let embed = new Discord.MessageEmbed()
    .setColor("#00d9fc")
    .setThumbnail(bot.user.displayAvatarURL())
    .setTitle(`Help Command`)
    .addField("Config server:", "Commands", false)
    .addFields(
      {
        name: "Initialize server:",
        value: "<prefix> server init",
        inline: false,
      },
      {
        name: "Delete server:",
        value: "<prefix> server delete",
        inline: false,
      },
      {
        name: "Add server prefix",
        value: "<prefix> server prefix <prefix character>",
        inline: false,
      }
    )
    .addField("Penalty Command", "It prevent players to start match")
    .addFields(
      {
        name: "Add penalty members",
        value: "<prefix> penalty <mention members>",
        inline: false,
      },
      {
        name: "Remove penalty members",
        value: "<prefix> penalty remove <mention members>",
        inline: false,
      }
    )
    .addField(
      "Start a team selection match",
      "1. Join waiting lobby channel \n2. type <prefix>team \n3. React team type \n4. <prefix>start \n Enjoy!",
      false
    )
    .setFooter("==============Thanks for using this bot==============");
  return embed;
};
