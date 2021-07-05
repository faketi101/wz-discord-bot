module.exports = (message, c_id, name) => {
  message.guild.channels
    .create(name, {
      type: "voice",
    })
    .then((channel) => {
      channel.setParent(c_id);
    });
};
