module.exports = async client => {
  const Discord = require("discord.js");
  await client.wait(1000);
  client.guilds.filter(g => !client.customCommands.has(g.id)).forEach(g => {
    client.customCommands.set(g.id, {});
    client.settings.set(g.id, client.config.defaults)
    client.modlist.set(g.id, []);
    client.mutes.set(g.id, []);
    client.punishments.set(g.id, []);
    client.nameRecord.set(g.id, {});
    client.voiceChannels.set(g.id, []);
  });
  client.user.setGame("with !help");
  client.log("Bot is ready!");
};
