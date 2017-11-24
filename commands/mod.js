exports.run = async (client, message, [action, ...ids]) => {
  action = action.toLowerCase();
  const allowedActions = ["add", "remove", "list"];
  if(!allowedActions.includes(action)) return message.channel.send("Mods can only be `add`ed, `remove`d or `list`ed. Invalid action.");
  if(action !== "list" && ids.length < 1) return message.channel.send("No individuals were listed.");

  const modList = client.modlist.get(message.guild.id);
  switch(action) {
    case "add":
      let added = [];
      ids.forEach(id => {
        if(modList.includes(id)) return;
        modList.push(id);
        added.push(id);
      });
      client.modlist.set(message.guild.id, modList);
      if(added.length < 1) return message.channel.send("All provided IDs were already in the list.");
      else message.channel.send("The following IDs were successfully added to the list:\n```" + added.join("\n") + "```");
      break;
    case "remove":
      ids.forEach(id => {
        const index = modList.indexOf(id);
        if(index < 0) return;
        modList.splice(index, 1);
      });
      client.modlist.set(message.guild.id, modList);
      message.channel.send("The specified IDs were removed from the list, assuming they were present.");
      break;
    case "list":
      let output = "```\n";
      modList.forEach(id => {
        const member = client.users.get(id);
        output += member ? `${member.tag} (ID:${id})\n` : `Invalid (ID:${id})\n`;
      });
      output += "```";
      message.channel.send(output);
      break;
  }
};

exports.conf = {
  guildOnly: true,
  permLevel: "Server Owner"
};

exports.info = {
  name: "mod"
};
