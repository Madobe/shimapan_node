module.exports = (client, guild, user) => {
  client.servlog(
    client,
    guild,
    `:warning: **${user.username}** (ID:${user.id}) was unbanned from the server.`
  );
};
