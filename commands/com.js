exports.run = async (client, message, [action, trigger, ...value]) => {
  if(!action) return message.channel.send("You must provide an action (add, remove, edit, list).");
  const allowedActions = ["add", "remove", "edit", "list"];
  if(!allowedActions.includes(action)) return message.channel.send("Invalid action.");
  if(action !== "list" && !trigger) return message.channel.send("No trigger phrase provided.");
  if((action == "add" || action == "edit") && value.length < 1) return message.channel.send("No value provided for the custom command's output.");

  const comList = client.customCommands.get(message.guild.id);

  switch(action) {
    case "add":
      if(comList[trigger]) return message.channel.send("The trigger specified already exists.");
      comList[trigger] = value.join(" ");
      message.channel.send("`" + trigger + "` successfully added.");
      break;
    case "remove":
      if(!comList[trigger]) return message.channel.send("The trigger specified does not exist.");
      delete comList[trigger];
      message.channel.send("`" + trigger + "` was removed.");
      break;
    case "edit":
      if(!comList[trigger]) return message.channel.send("The trigger specified does not exist.");
      comList[trigger] = value.join(" ");
      message.channel.send("`" + trigger + "` has been successfully modified.");
      break;
    case "list":
      const keys = Object.keys(comList);
      let output = "The currently registered custom commands are:\n```\n";
      for(let i = 0; i < keys.length; i++) {
        output += "!" + keys[i] + " ".repeat(21 - keys[i].length);
        if(i % 4 == 3 && i !== keys.length - 1) output += "\n";
      }
      output += "\n```";
      message.channel.send(output);
      break;
  }

  client.customCommands.set(message.guild.id, comList);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Moderator"
};

exports.info = {
  name: "com"
};
