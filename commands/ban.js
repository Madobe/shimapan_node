exports.run = async (client, message, [memberID, days, ...reason]) => {
  if(!memberID) return message.channel.send("A user to ban must be specified.");
  if(Number(days) == NaN) return message.channel.send("You must specify how many days of the user-to-ban's messages should be deleted when they are banned.");
  memberID = memberID.replace(/\D/g, '');
  const member = message.guild.members.get(memberID);
  member.ban({
    days: days,
    reason: reason.join(" ")
  });
  message.channel.send(`<@${memberID}> was banned from the server.`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "ban"
};
