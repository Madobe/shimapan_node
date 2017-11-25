exports.run = async (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  if(!settings["punish_role"]) return message.channel.send("No punish_role setting detected for this server. Please assign one using `!set`.");
  const memberID = args[0].replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  if(!member) return message.channel.send("Invalid user specified.");

  member.removeRole(settings["punish_role"])
  let punishList = client.punishments.get(message.guild.id);
  punishList = punishList.filter(entry => entry.user !== member.id);
  client.punishments.set(message.guild.id, punishList);

  message.channel.send(`${member.user.tag} has been unpunished.`);

  if(!client.allowedToLog(message, ["p"], [member.id])) return;
  client.modlog(
    client,
    message.guild,
    `:large_blue_circle: **${message.author.username}** (ID:${message.author.id}) unpunished **${member.user.username}** (ID:${member.id})`
  );
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "unpunish"
};
