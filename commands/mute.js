exports.run = async (client, message, [memberID, time, ...reason]) => {
  const settings = client.settings.get(message.guild.id);
  if(!settings["mute_role"]) return message.channel.send("No mute_role setting detected for this server. Please assign one using `!set`.");
  if(!memberID) return message.channel.send("You must specify a user to mute.");
  if(!time) return message.channel.send("You must specify how long to mute for.");
  if(reason.length < 1) reason = ["no reason specified."];

  memberID = memberID.replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  if(!member) return message.channel.send("Invalid user specified.");

  time = client.convertToMilliseconds(time);

  member.addRole(settings["mute_role"]);
  let muteList = client.mutes.get(message.guild.id);
  muteList = muteList.filter(entry => entry.user !== member.id); // Remove any old entries for this person
  muteList.push({user: member.id, time: Date.now() + time});
  client.mutes.set(message.guild.id, muteList);

  message.channel.send(`${member.user.tag} was muted for ${client.humanizeTime(time)}.`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "mute"
};
