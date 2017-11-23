module.exports = (client, message) => {
  // Don't worry about anything a bot says at all
  if(message.author.bot) return;

  // Pop out the settings for this specific server
  settings = client.settings.get(message.guild.id);

  // Prefixes can be set per server, otherwise use default
  if(message.content.startsWith(settings["prefix"] || "!")) {
    // Check regular commands first
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if(cmd) {
      if(!message.guild && cmd.conf.guildOnly) {
        return message.channel.send("This command cannot be run in a Direct Message (DM).");
      }

      // There are only 4 levels of access: a normal user (1), a mod (2), a server owner (3) and the bot owner (4)
      if(client.permLevel(message) < client.levelCache[cmd.conf.permLevel]) {
        return message.channel.send("You do not have the necessary permission level to use this command.");
      }

      cmd.run(client, message, args);
    } else {
      const cc = client.customCommands.get(command);
      if(!cc) return;
      message.channel.send(cc);
    }
  }
};
