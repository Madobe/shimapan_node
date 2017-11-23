exports.run = (client, message, args) => {
  message.reply(`your permission level is ${client.permLevel(message)}.`);
};

exports.conf = {
  guildOnly: false,
  permLevel: "User"
};

exports.info = {
  name: "permlevel"
};
