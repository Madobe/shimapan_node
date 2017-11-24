exports.run = async (client, message, args) => {
  if(args.length < 1) return message.channel.send("No user to look up specified.");
  const username = args.join(" ");
  const userID = message.guild.members.find(member => member.user.username == username).id;
  message.channel.send(userID);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "user"
};
