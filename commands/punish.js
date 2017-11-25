exports.run = async (client, message, [memberID, time, ...reason]) => {
  const settings = client.settings.get(message.guild.id);
  if(!settings["punish_role"]) return message.channel.send("No punish_role setting detected for this server. Please assign one using `!set`.");
  if(!memberID) return message.channel.send("You must specify a user to punish.");
  if(!time) return message.channel.send("You must specify how long to punish for.");
  if(reason.length < 1) reason = ["no reason specified."];

  memberID = memberID.replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  if(!member) return message.channel.send("Invalid user specified.");

  if(client.isMod(message.guild, member.id)) return message.channel.send(`**${member.user.username}** cannot be punished because they are a moderator.`);

  time = client.convertToMilliseconds(time);

  member.addRole(settings["punish_role"]);
  let punishList = client.punishments.get(message.guild.id);
  punishList = punishList.filter(entry => entry.user !== member.id); // Remove any old entries for this person
  punishList.push({user: member.id, time: Date.now() + time});
  client.punishments.set(message.guild.id, punishList);

  message.channel.send(`**${member.user.username}** was punished for ${client.humanizeTime(time)}.`);

  if(!client.allowedToLog(message, ["p"], [member.id])) return;
  client.modlog(
    client,
    message.guild,
    `:black_circle: **${message.author.username}** (ID:${message.author.id}) punished **${member.user.username}** (ID:${member.id}) for ${client.humanizeTime(time)} for ${reason.join(" ")}`
  );
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "punish"
};
