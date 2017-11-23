exports.run = async (client, message, args) => {
  message.channel.send("Pong.")
};

exports.conf = {
  guildOnly: false,
  permLevel: "User"
};

exports.info = {
  name: "ping"
};
