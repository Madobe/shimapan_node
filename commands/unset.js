exports.run = async (client, message, [key, ...other]) => {
  if(!key) return message.channel.send("Please specify which setting should be removed.");
  const settings = client.settings.get(message.guild.id);
  delete settings[key];
  client.settings.set(message.guild.id, settings);
  message.channel.send(`\`${key}\` successfully deleted.`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Server Owner"
};

exports.info = {
  name: "unset"
};
