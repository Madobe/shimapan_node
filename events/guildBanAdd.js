module.exports = (client, guild, user) => {
  client.servlog(
    client,
    guild,
    `:hammer: **${user.username}** (ID:${user.id}) was banned from the server.`
  );
};
