exports.run = async (client, message, args) => {
  client.guilds.forEach(guild => {
    const settings = client.settings.get(guild.id);
    if(!settings["announcements_channel"]) return;
    const announceChannel = guild.channels.filter(c => c.type === "text").get(settings["announcements_channel"]);
    if(!announceChannel) return;
    announceChannel.send(args.join(" "));
  });
  message.channel.send("The message was broadcasted to all servers with an announcements channel set.");
};

exports.conf = {
  guildOnly: false,
  permLevel: "Bot Owner"
};

exports.info = {
  name: "announce"
};
