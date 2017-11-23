exports.run = async (client, message, args) => {
  const { promisify } = require("util");
  const readdir = promisify(require("fs").readdir);

  const cmdFiles = await readdir("./commands/");
  cmdFiles.forEach(file => {
    if(!file.endsWith(".js")) return;

    try {
      delete require.cache[require.resolve(`../commands/${file}`)];
      const props = require(`../commands/${file}`);
      client.commands.set(props.info.name, props);
    } catch(e) {
      client.log(`Failed to reload command in file: ${file}`);
    }
  });

  message.channel.send("All command definitions have been reloaded.");
};

exports.conf = {
  guildOnly: false,
  permLevel: "Bot Owner"
};

exports.info = {
  name: "reload"
};
