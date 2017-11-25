module.exports = (client, oldMember, newMember) => {
  // We're only interested in 2 changes: nicknames and roles
  if(oldMember.nickname !== newMember.nickname) {
    client.servlog(
      client,
      newMember.guild,
      `:id: **${newMember.user.username}** (ID:${newMember.id}) changed nicknames from **${oldMember.nickname || "none"}** to **${newMember.nickname || "none"}**`
    );

    // For the !names command
    const nameRecord = client.nameRecord.get(newMember.guild.id);
    if(!nameRecord[newMember.id]) nameRecord[newMember.id] = [];
    nameRecord[newMember.id].push(newMember.nickname || "none");
    if(nameRecord[newMember.id].length > 20) nameRecord[newMember.id].shift();
    client.nameRecord.set(newMember.guild.id, nameRecord);
  } else if(!oldMember.roles.equals(newMember.roles)) {
    let larger, smaller, operation;
    if(oldMember.roles.size > newMember.roles.size) {
      larger = oldMember.roles.map(r => r.name);
      smaller = newMember.roles.map(r => r.name);
      operation = "removed";
    } else {
      larger = newMember.roles.map(r => r.name);
      smaller = oldMember.roles.map(r => r.name);
      operation = "added";
    }
    const difference = larger.filter(role => !smaller.includes(role));
    client.servlog(
      client,
      newMember.guild,
      client.clean(`:name_badge: **${newMember.user.username}** (ID:${newMember.id}) had roles ${operation}: **${difference.join(", ")}**`)
    );
  }
};
