exports.run = async (client, message, args) => {
  client.fakePermLevels.set(message.author.id, client.levelCache[args.join(" ")]);
  message.reply(`your permission level has been set to ${client.levelCache[args.join(" ")]}.`);
};

exports.conf = {
  guildOnly: false,
  permLevel: "Bot Owner"
};

exports.info = {
  name: "fakepermlevel"
};
