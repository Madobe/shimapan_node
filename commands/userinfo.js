exports.run = async (client, message, args) => {
  let user, member;
  if(args.length < 1) {
    member = message.guild.members.get(message.author.id);
    user = message.author;
  } else {
    member = message.guild.members.get(args[0]) || message.guild.members.filter(m => m.user.tag === args.join(" ") || m.user.username === args.join(" ")).first();
    if(!member) return message.channel.send("The user could not be found. Searches are done exactly and must match ID, username or tag.");
    user = member.user;
  }

  // Getting the join order is basically ordering the members and then taking 3 behind and 3 ahead,
  // if available
  joinOrder = message.guild.members.sort((x, y) => {
    return x.joinedTimestamp > y.joinedTimestamp;
  });
  joinOrder = joinOrder.map(x => x.user.tag);
  const index = joinOrder.indexOf(user.tag);
  joinOrder[index] = `**${user.tag}**`;
  joinOrder = joinOrder.slice(client.clamp(index - 3, 0, index), index + 3);

  message.channel.send(`**${user.username}**#${user.discriminator} (ID:**${user.id}**)
» **Nickname**: ${member.displayName}
» **Roles**: ${member.roles.map(role => role.name).join(", ").replace(/@/g, "@" + String.fromCharCode(8203))}
» **Account Creation**: ${user.createdAt.toUTCString()}
» **Join Date**: ${member.joinedAt.toUTCString()}
» **Join Order**: ${joinOrder.join(" > ")}
» **Avatar**: ${user.avatarURL}`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "User"
};

exports.info = {
  name: "userinfo"
};
