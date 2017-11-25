module.exports = (client, member) => {
  client.servlog(
    client,
    member.guild,
    `:inbox_tray: **${member.user.username}** (ID:${member.id}) joined the server.`
  );

  // Check if they were rejoining to try to circumvent a mute
  const settings = client.settings.get(member.guild.id);
  const muteList = client.mutes.get(member.guild.id);
  const muteEntry = muteList.filter(entry => entry.user == member.id);
  if(settings["mute_role"] && muteEntry.length) member.addRole(settings["mute_role"]);

  // Check if they were rejoining to try to circumvent a punishment
  const punishList = client.punishments.get(member.guild.id);
  const punishEntry = punishList.filter(entry => entry.user == member.id);
  if(settings["punish_role"] && punishEntry.length) member.addRole(settings["punish_role"]);
};
