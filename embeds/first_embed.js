module.exports = (message, Discord, bot) => {
  let embed = new Discord.MessageEmbed()
    .setTitle(`Hey ${message.guild.name}'s Admins and Mods!!`)
    .setColor("#FF6600")
    .setThumbnail(bot.user.displayAvatarURL())
    .addField(
      "Please Initialize This Server First",
      "Without initialization you can't run any coommands.",
      false
    )
    .addField(
      "How to initialize?",
      `Please type '-server init' by an administrator user.`,
      false
    )
    .addField("How to use?", "After initialization please type '-help'", false)
    .setFooter("============Thanks for using this bot============");

  return embed;
};
