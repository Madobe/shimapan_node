module.exports = (client, guild) => {
  client.customCommands.set(guild.id, {});
  client.settings.set(guild.id, client.config.defaults);
  client.modlist.set(guild.id, []);
  client.mutes.set(guild.id, []);
  client.punishments.set(guild.id, []);
};
