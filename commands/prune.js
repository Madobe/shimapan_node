exports.run = async (client, message, [number, ...other]) => {
  if(!number) return message.channel.send("You must specify a number of messages to delete.");
  message.channel.bulkDelete(number);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Server Owner"
};

exports.info = {
  name: "prune"
};
