module.exports = (message, Discord, bot, data, user) => {
  // console.log(user);
  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days";
  }
  let milisec = parseInt(data.time, 10);
  let time = msToTime(milisec - new Date().getTime());
  let embed = new Discord.MessageEmbed()
    .setColor("#fd0101")
    .setTitle(`Hey ${user.username}. \nYou heve been punished!!`)
    .setThumbnail(user.avatarURL())
    .addField(`Punishment will recover after: `, `${time}`, false)
    .setFooter("=============Thanks for using this bot=============");

  return embed;
};
