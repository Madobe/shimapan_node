module.exports = async client => {
  await client.wait(1000);
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaults));
  client.user.setGame("with !help");
  client.log("Bot is ready!");
};
