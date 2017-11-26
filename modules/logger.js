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

  // Check whether the logging is allowed or not
  client.allowedToLog = (message, modifiers, ids) => {
    if(modifiers.length < 1 || ids.length < 1) return false;
    const settings = client.settings.get(message.guild.id);
    if(!settings["logging"]) return true;
    for(let i = 0; i < settings["logging"].length; i++) {
      const setting = settings["logging"][i];
      if(!setting.allow && modifiers.includes(setting.type) && (ids.includes(setting.id) || setting.id == 0)) return false;
    }
    return true;
  };
};
