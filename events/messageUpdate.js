module.exports = (client, oldMessage, newMessage) => {
  if(newMessage.author.bot) return;
  if(!client.allowedToLog(newMessage, ["e", "c"], [newMessage.author.id, newMessage.channel.id])) return;
  if(oldMessage.content === newMessage.content) return;
  client.servlog(
    client,
    oldMessage.guild,
    client.clean(`:pencil: **${oldMessage.author.username}**'s message in ${oldMessage.channel} was edited:
**From:** ${client.clean(oldMessage.content)}
**To:** ${client.clean(newMessage.content)}`)
  );
};
