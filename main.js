const deleteChannel = require("./helpers/delete_channel");
const deletePenalty = require("./helpers/delete_penalty");
const Discord = require("discord.js");
const bot = new Discord.Client({
  partials: ["MESSAGE, CHANNEL, REACTION", "GUILD_MEMBER"],
});
require("dotenv").config();

const mongoose = require("mongoose");

bot.command = new Discord.Collection();
bot.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot, Discord);
});

setInterval(async () => {
  await deleteChannel(bot);
  await deletePenalty();
}, 60000);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((error) => {
    console.log(error);
  });

bot.login(process.env.BOT_TOKEN);
