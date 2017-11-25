module.exports = (client, message) => {
  if(message.author.bot) return;
  if(!client.allowedToLog(message, ["d", "c"], [message.author.id, message.channel.id])) return;
  client.servlog(
    client,
    message.guild,
    `:x: **${message.author.username}**'s message was deleted from ${message.channel.name}:
${client.clean(message.content)}`
  );
};
