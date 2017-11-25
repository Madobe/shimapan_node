exports.run = async (client, message, args) => {
  const userID = args[0].replace(/\D/g, '');
  message.guild.unban(userID);
  message.channel.send(`<@${userID}> was unbanned from the server.`);

  if(!client.allowedToLog(message, ["b"], [userID])) return;
  client.modlog(
    client,
    message.guild,
    `:warning: **${message.author.username} (ID:${message.author.id}) unbanned <@${userID}> from the server.`
  );
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "unban"
};
