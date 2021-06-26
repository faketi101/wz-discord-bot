const addReactions = (message, reactions) => {
  //   console.log(reactions);
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};
const errorHandler = require("../handlers/error_handler");
module.exports = async (client, id, text, reactions, mess = []) => {
  try {
    await mess.channel.messages
      .fetch({ limit: 2 })
      .then((messages) => {
        mess.channel.bulkDelete(messages);
      })
      .then(async () => {
        const channel = await client.channels.fetch(id);

        await channel.messages.fetch().then((messages) => {
          if (messages.size === 0) {
            // Send a new message
            channel.send(text).then((message) => {
              addReactions(message, reactions);
            });
          } else {
            // // Edit the existing message
            // for (const message of messages) {
            //   message[1].edit(text);
            //   addReactions(message[1], reactions);
            // }
            channel.send("more than one message");
          }
        });
      });
  } catch (error) {
    errorHandler(null, error);
  }
  // const channel = await client.channels.fetch(id);

  // channel.messages.fetch().then((messages) => {
  //   if (messages.size === 0) {
  //     // Send a new message
  //     channel.send(text).then((message) => {
  //       addReactions(message, reactions);
  //     });
  //   } else {
  //     // // Edit the existing message
  //     // for (const message of messages) {
  //     //   message[1].edit(text);
  //     //   addReactions(message[1], reactions);
  //     // }
  //     channel.send("more than one message");
  //   }
  // });
};
