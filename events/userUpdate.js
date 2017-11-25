module.exports = (client, oldUser, newUser) => {
  if(!oldUser.username !== newUser.username) {
    const guilds = client.guilds.filter(g => g.members.get(newUser.id));
    guilds.forEach(guild => {
      const settings = client.settings.get(guild.id);
      if(!settings["serverlog_channel"]) return;
      client.servlog(
        client,
        guild,
        `:id: **${oldUser.username}** (ID:${oldUser.id}) changes usernames to **${newUser.username}**`
      );
    });
  }
};
