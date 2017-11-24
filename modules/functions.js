module.exports = (client) => {
  client.permLevel = message => {
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g).slice(1);
    if(client.config.ownerID === message.author.id) {
      const fakePermLevel = client.fakePermLevels.get(message.author.id);
      // Don't block off resetting the fake perm level
      if(message.content.startsWith("!fakepermlevel")) {
        return 4;
      // If we're not changing the level and one is set, use it
      } else if(fakePermLevel) {
        return fakePermLevel;
      }
    }

    let permLevel = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while(permOrder.length) {
      const currentLevel = permOrder.shift();
      if(currentLevel.check(message)) {
        permLevel = currentLevel.level;
        break;
      }
    }

    return permLevel;
  };

  // Remove code blocks and pings from given text
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 0});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  // await client.wait(1000); Stop for a second.
  client.wait = require("util").promisify(setTimeout);

  // Log to the console
  client.log = (message, type) => {
    console.log(`[${type || "Log"}] ${message}`);
  };

  client.clamp = (num, min, max) => {
    return num <= min ? min : num >= max ? max : num;
  };

  // Give information about uncaught stuff
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
