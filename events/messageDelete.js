module.exports = (client, message) => {
  if(message.author.bot) return;
  client.servlog(
    client,
    message.guild,
    `:x: **${message.author.username}**'s message was deleted from ${message.channel.name}:
${client.clean(message.content)}`
  );
};
