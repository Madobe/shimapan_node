exports.run = async (client, message, [memberID, ...reason]) => {
  if(!memberID) return message.channel.send("A user to kick must be specified.");
  memberID = memberID.replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  if(!member) message.channel.send("Invalid user specified.");
  member.kick(reason.join(" "));
  message.channel.send(`<@${member.id}> was kicked from the server.`);

  // Modlog entry
  if(!client.allowedToLog(message, ["k"], [member.id])) return;
  client.modlog(
    client,
    message.guild,
    `:outbox_tray: **${message.author.username}** (ID:${message.author.id}) kicked **${member.user.username}** (ID:${member.id}) from the server.`
  );
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "kick"
};
