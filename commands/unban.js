exports.run = async (client, message, args) => {
  const userID = args[0].replace(/\D/g, '');
  message.guild.unban(userID);
  message.channel.send(`<@${userID}> was unbanned from the server.`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "unban"
};
