module.exports = (client, member) => {
  client.servlog(
    client,
    member.guild,
    client.clean(`:outbox_tray: **${member.user.username}** (ID:${member.id}) left or was kicked from the server. **Roles:** ${member.roles.filter(r => r.name !== "@everyone").map(r => r.name).join(", ")}`)
  );
};
