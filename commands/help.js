exports.run = async (client, message, args) => {
  message.channel.send("https://github.com/Madobe/shimapan/wiki/");
};

exports.conf = {
  guildOnly: false,
  permLevel: "User"
};

exports.info = {
  name: "help"
};
