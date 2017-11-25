module.exports = (client, oldMember, newMember) => {
  if(oldMember.voiceChannel === newMember.voiceChannel) return;
  if(!newMember.voiceChannel) {
    return client.servlog(
      client,
      newMember.guild,
      `:mute: **${newMember.user.username}** (ID:${newMember.id}) left voice channel **${oldMember.voiceChannel.name}**`
    );
  } else if(!oldMember.voiceChannel) {
    return client.servlog(
      client,
      newMember.guild,
      `:loud_sound: **${newMember.user.username}** (ID:${newMember.id}) joined voice channel **${newMember.voiceChannel.name}**`
    );
  } else {
    return client.servlog(
      client,
      newMember.guild,
      `:loud_sound: **${newMember.user.username}** (ID:${newMember.id}) changed voice channels to **${newMember.voiceChannel.name}**`
    );
  }
};
