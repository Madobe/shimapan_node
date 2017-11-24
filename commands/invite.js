exports.run = async (client, message, args) => {
  message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=293636546211610625&scope=bot&permissions=268446726")
};

exports.conf = {
  guildOnly: false,
  permLevel: "User"
};

exports.info = {
  name: "invite"
};
