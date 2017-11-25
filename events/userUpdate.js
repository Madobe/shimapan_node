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

    // For the !names command
    const usernameRecord = client.usernameRecord.get(newUser.id) || [];
    usernameRecord.push(newUser.username);
    if(usernameRecord.length > 20) usernameRecord.shift();
    client.usernameRecord.set(newUser.id, usernameRecord);
  }
};
