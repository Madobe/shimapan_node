exports.run = async (client, message, args) => {
  if(args.length < 1) return message.channel.send("No role name to look up specified.");
  const roleName = args.join(" ");
  const roleID = message.guild.roles.find("name", roleName).id;
  message.channel.send(roleID);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "role"
};
