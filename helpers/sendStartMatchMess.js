const Discord = require("discord.js");
module.exports = async (message, data) => {
  const player = message.guild.members.cache.find((user) => user.id == data.id);
  // console.log(player);
  let embed = new Discord.MessageEmbed()
    .setColor("#00DAFC")
    .setTitle("Your Match Info")
    .setThumbnail(player.user.avatarURL())
    .addField("Name: ", `<@${player.user.id}>`, false)
    .addFields(
      { name: "Match ID:", value: data.matchID, inline: false },
      { name: "Your Team:", value: data.team, inline: false }
    )
    .setFooter("=============Thanks For Using This Bot=============");
  player.send(embed);
};
