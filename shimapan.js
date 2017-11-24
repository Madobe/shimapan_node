// Top level requires
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

// Load the client
const client = new Discord.Client();

// Load the configuration file
client.config = require("./config/config.js")

// Load some basic functions
require("./modules/functions.js")(client);

// Set up the enmaps
client.commands = new Enmap();
client.customCommands = new Enmap({provider: new EnmapLevel({name: "customcommands"})});
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});
client.modlist = new Enmap({provider: new EnmapLevel({name: "modlist"})});
client.mutes = new Enmap({provider: new EnmapLevel({name: "mutes"})});
client.punishments = new Enmap({provider: new EnmapLevel({name: "punishments"})});
client.fakePermLevels = new Enmap();

const init = async () => {
  // Load commands
  const cmdFiles = await readdir("./commands/");
  cmdFiles.forEach(file => {
    if(!file.endsWith(".js")) return;

    try {
      const props = require(`./commands/${file}`);
      client.commands.set(props.info.name, props);
    } catch(e) {
      client.log(`Failed to load ${file}: ${e}`);
    }
  });

  // Load events from the events folder
  const evtFiles = await readdir("./events/");
  evtFiles.forEach(file => {
    if(!file.endsWith(".js")) return;
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.levelCache = {};
  for(let i = 0; i < client.config.permLevels.length; i++) {
    const currentLevel = client.config.permLevels[i];
    client.levelCache[currentLevel.name] = currentLevel.level;
  }

  client.login(client.config.token);
};

init();
