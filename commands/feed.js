exports.run = async (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  if(!settings["logging"]) settings["logging"] = [];
  if(args[0] == "flush") {
    settings["logging"] = [];
    client.settings.set(message.guild.id, settings);
    message.channel.send("All feed settings have been reset.");
  } else if(args[0] == "list") {
    if(settings["logging"].length < 1) return message.channel.send("No settings detected.");

    const longNames = {
      n: "nickname change",
      r: "role addition/deletion",
      e: "message edit",
      d: "message deletion",
      c: "channel-specific ignore",
      v: "voice channel join/leave/change",
      k: "kicks",
      m: "mutes",
      p: "punishments",
      b: "bans"
    };

    let output = "```diff\n";
    for(let i = 0; i < settings["logging"].length; i++) {
      output += settings["logging"][i].allow ? "+" : "-";
      output += longNames[settings["logging"][i].type] + " for ID ";
      output += settings["logging"][i].id;
      output += "\n";
    }
    output += "```";
    message.channel.send(output);
  } else {
    const options = [];
    const valid_types = ["n", "r", "e", "d", "c", "v", "k", "m", "p", "b"];
    args.forEach(arg => {
      if(!/^[+-]{1}[a-zA-Z]{1}\d*$/.test(arg)) return;
      if(!valid_types.includes(arg[1])) return;
      options.push({
        allow: arg[0] == "+" ? true : false,
        type: arg[1],
        id: Number(arg.slice(2))
      });
    });
    settings["logging"] = settings["logging"].concat(options);
    client.settings.set(message.guild.id, settings);
    message.channel.send("Feed settings updated.");
  }
};

exports.conf = {
  guildOnly: true,
  permLevel: "Server Owner"
};

exports.info = {
  name: "feed"
};
