exports.run = async (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  if(!settings["mute_role"]) return message.channel.send("No mute_role setting detected for this server. Please assign one using `!set`.");
  const memberID = args[0].replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  if(!member) return message.channel.send("Invalid user specified.");

  member.removeRole(settings["mute_role"])
  let muteList = client.mutes.get(message.guild.id);
  muteList = muteList.filter(entry => entry.user !== member.id);
  client.mutes.set(message.guild.id, muteList);

  message.channel.send(`${member.user.tag} has been unmuted.`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "unmute"
};
