exports.run = async (client, message, [memberID, days, ...reason]) => {
  if(!memberID) return message.channel.send("A user to ban must be specified.");
  if(Number(days) == NaN) return message.channel.send("You must specify how many days of the user-to-ban's messages should be deleted when they are banned.");
  memberID = memberID.replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  if(!member) return message.channel.send("Invalid user specified.");

  if(client.isMod(message.guild, member.id)) return message.channel.send(`**${member.user.username}** cannot be banned because they are a moderator.`);

  member.ban({
    days: days,
    reason: reason.join(" ")
  });
  message.channel.send(`<@${memberID}> was banned from the server.`);

  // Modlog entry
  if(!client.allowedToLog(message, ["b"], [memberID])) return;
  client.modlog(
    client,
    message.guild,
    `:hammer: **${message.author.username}** (ID:${message.author.id}) banned **${member.user.username}** (ID:${member.id}) from the server.`
  );
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "ban"
};
