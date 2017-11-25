module.exports = (client, oldMessage, newMessage) => {
  if(message.author.bot) return;
  if(oldMessage.content === newMessage.content) return;
  client.servlog(
    client,
    oldMessage.guild,
    `:pencil: **${oldMessage.author.username}**'s message in ${oldMessage.channel} was edited:
**From:** ${client.clean(oldMessage.content)}
**To:** ${client.clean(newMessage.content)}`
  );
};
