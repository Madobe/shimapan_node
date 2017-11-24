exports.run = async (client, message, [key, ...value]) => {
  if(!client.config.allowedSettings.includes(key) && key !== "list") return message.channel.send("That is not a setting field that may be assigned a value.");
  if(!key) return message.channel.send("Please specify which setting should have its value set.");
  const settings = client.settings.get(message.guild.id);

  if(key === "list") {
    rowSeparator = `+${"-".repeat(27)}+${"-".repeat(27)}+\n`;
    let output = "```haskell\n";
    output += rowSeparator;
    output += `| Option ${" ".repeat(18)} | Value ${" ".repeat(19)} |\n`;
    output += rowSeparator;
    client.config.allowedSettings.forEach(name => {
      output += `| ${name} ${" ".repeat(24 - name.length)} | ${settings[name]} ${" ".repeat(24 - settings[name].toString().length)} |\n`;
    });
    output += rowSeparator;
    output += "```";
    return message.channel.send(output);
  }

  if(value.length < 1) return message.channel.send("Please specify a value for the setting.");
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
