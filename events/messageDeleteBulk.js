module.exports = (client, messages) => {
  if(messages.first().author.bot) return;

  // Prevent double firing of this event from causing two uploads like keeps on happening
  if(client.bulkDeleteLock == messages.first().id) return;
  client.bulkDeleteLock = messages.first().id;

  const Discord = require("discord.js");

  // Explicitly check this one because it has file system operations
  const settings = client.settings.get(messages.first().guild.id);
  if(!settings["serverlog_channel"]) return;
  const logChannel = messages.first().guild.channels.get(settings["serverlog_channel"]);

  // Don't wanna write to the text file multiple times so I'll just write it all into a string right
  // now and only write that one string to the file
  let log = "";
  messages.forEach(message => {
    log += client.timestamp(message.createdAt) + message.content + "\n\n";
  });

  const { promisify } = require("util");
  const fs = require("fs");
  const filename = "./temp/" + messages.first().author.username + ".txt";
  if(logChannel.type !== "text") return;

  fs.writeFile(filename, log, (err) => {
    if(err) throw err;
    logChannel.send(
      client.timestamp() + `**${messages.first().author.username}** (ID:${messages.first().author.id}) had ${messages.size} messages deleted.`,
      new Discord.Attachment(filename, "log.txt")
    );
  });
};
