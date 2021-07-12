module.exports = (Discord, bot) => {
  console.log("Bot is Online...");
  bot.user
    .setPresence({ activity: { name: "COD WARZONE" }, status: "online" })
    .then()
    .catch(console.error);
};
