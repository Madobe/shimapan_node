exports.run = async (client, message, args) => {
  const guild = message.guild;
  message.channel.send(`**${guild.name}** (ID:${guild.id}
» **Server Owner**: ${guild.owner.user.tag}
» **Region**: ${guild.region}
» **Member Count**: ${guild.members.filter(m => m.presence.status !== 'offline').size} online out of ${guild.memberCount}
» **Channel Count**: ${guild.channels.size}
» **Verification Level**: ${guild.verificationLevel}
» **Server Icon**: ${guild.iconURL}`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "User"
};

exports.info = {
  name: "serverinfo"
};
