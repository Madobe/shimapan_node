exports.run = async (client, message, args) => {
  if(args.length < 1) args[0] = message.author.id;
  const userID = args[0].replace(/\D/g, '');
  const usernameRecord = client.usernameRecord.get(userID) || [];
  const nameRecord = client.nameRecord.get(message.guild.id)[userID] || [];
  message.channel.send(`**Last 20 usernames:**
${usernameRecord.join(", ")}
**Last 20 nicknames:**
${nameRecord.join(", ")}`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "User"
};

exports.info = {
  name: "names"
};
