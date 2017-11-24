module.exports = async client => {
  await client.wait(1000);
  client.guilds.filter(g => !client.customCommands.has(g.id)).forEach(g => {
    client.customCommands.set(g.id, {});
  });
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => {
    client.settings.set(g.id, client.config.defaults)
  });
  client.guilds.filter(g => !client.modlist.has(g.id)).forEach(g => {
    client.modlist.set(g.id, []);
  });
  client.guilds.filter(g => !client.mutes.has(g.id)).forEach(g => {
    client.mutes.set(g.id, []);
  });
  client.guilds.filter(g => !client.punishments.has(g.id)).forEach(g => {
    client.punishments.set(g.id, []);
  });
  client.user.setGame("with !help");
  client.log("Bot is ready!");
};
