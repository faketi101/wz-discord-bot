module.exports = (message, p_id, r_id) => {
  // console.log("add role called");
  let role = message.guild.roles.cache.find((rl) => rl.id === r_id);
  let player = message.guild.members.cache.find((usr) => usr.id === p_id);
  player.roles.add(role);
};
