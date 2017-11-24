exports.run = async (client, message, [key, ...value]) => {
  if(!client.config.allowedSettings.includes(key)) return message.channel.send("That is not a setting field that may be assigned a value.");
  if(!key) return message.channel.send("Please specify which setting should have its value set.");
  if(value.length < 1) return message.channel.send("Please specify a value for the setting.");
  const settings = client.settings.get(message.guild.id);
  settings[key] = value.join(" ");
  client.settings.set(message.guild.id, settings);
  message.channel.send(`\`${key}\` successfully assigned a value of \`${value.join(" ")}\`.`);
};

exports.conf = {
  guildOnly: true,
  permLevel: "Server Owner"
};

exports.info = {
  name: "set"
};
