module.exports = (client) => {
  client.servlog = (client, guild, entry) => {
    const settings = client.settings.get(guild.id);
    if(!settings["serverlog_channel"]) return;
    const logChannel = guild.channels.filter(c => c.type === "text").get(settings["serverlog_channel"]);
    if(!logChannel) return;
    logChannel.send(client.timestamp() + entry);
  };

  client.modlog = (client, guild, entry) => {
    const settings = client.settings.get(guild.id);
    if(!settings["modlog_channel"]) return;
    const logChannel = guild.channels.filter(c => c.type === "text").get(settings["modlog_channel"]);
    if(!logChannel) return;
    logChannel.send(client.timestamp() + entry);
  };
};
