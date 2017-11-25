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

  client.isMod = (guild, id) => {
    const modList = client.modlist.get(guild.id);
    if(modList.includes(id)) return true;
    if(guild.owner.user.id === id) return true;
    if(client.config.ownerID === id) return true;
    return false;
  };

  // Remove code blocks and pings from given text
  client.clean = (text) => {
    text = text
      .replace(/`/g, "\`")
      .replace(/@/g, "@" + String.fromCharCode(8203))

    return text;
  };

  // Takes something like 80m and converts it to 80 minutes in milliseconds
  client.convertToMilliseconds = (time) => {
    const multipliers = {
      d: 60 * 60 * 24 * 1000,
      h: 60 * 60 * 1000,
      m: 60 * 1000,
      s: 1000
    };
    if(!Number(time.slice(0, -1)) || !multipliers[time.slice(-1)]) return "Invalid time unit. Please provide a time with s, m, h or d.";
    time = Number(time.slice(0, -1)) * multipliers[time.slice(-1)];

    return time;
  }

  // Milliseconds to humanized time
  client.humanizeTime = (time) => {
    let output = "";
    time /= 1000;
    const divisors = [86400, "days", 3600, "hours", 60, "minutes", 1, "seconds"];
    for(let i = 0; time >= 0; i += 2) {
      const amount = time / divisors[i];
      time %= divisors[i];
      if(amount >= 1) output += `${amount} ${divisors[i + 1]}, `;
    }
    return output.slice(0, -2);
  };

  // Makes an HH:MM:SS timestamp
  client.timestamp = (time) => {
    if(!time) time = new Date();
    const hours = "0" + time.getUTCHours();
    const minutes = "0" + time.getUTCMinutes();
    const seconds = "0" + time.getUTCSeconds();
    const timestamp = `\`[${hours.slice(-2)}:${minutes.slice(-2)}:${seconds.slice(-2)}]\` `;
    return timestamp;
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
