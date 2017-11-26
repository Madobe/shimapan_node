exports.run = async (client, message, args) => {
  // Set up what options are allowed to come in
  const typesAllowed = ["raid", "chat", "fireteam"];
  const optionsAllowed = ["max", "name", "muted", "locked"];

  // Process all the args
  const optionValues = {};
  let currentArg;
  args.forEach(arg => {
    const testVal = arg.toLowerCase().slice(2);
    if(arg.startsWith("--") && optionsAllowed.includes(testVal)) {
      currentArg = testVal;
      optionValues[testVal] = [];
    } else if(currentArg) {
      optionValues[currentArg].push(arg);
    }
  });
  
  // Decide the name of this channel
  let channelName;
  if(optionValues["name"] && optionValues["name"].length > 0) {
    channelName = optionValues["name"].join(" ");
  } else if(args[0] && typesAllowed.includes(args[0].toLowerCase())) {
    args[0] = args[0].toLowerCase();
    channelName = args[0].charAt(0).toUpperCase() + args[0].slice(1) + " " + (message.member.nickname || message.author.username);
  } else {
    channelName = "Chat " + (message.member.nickname || message.author.username); 
  }

  // Decide what perms are denied to @everyone
  let denyPerms = 0;
  if(optionValues["locked"] !== undefined) denyPerms += 1048576;
  if(optionValues["muted"] !== undefined) denyPerms += 2097152;

  const channel = await message.guild.createChannel(channelName, "voice", [
    // @everyone
    {
      id: message.guild.id,
      type: "role",
      allow: 1024,
      deny: denyPerms
    },
    // The person requesting this channel's creation
    {
      id: message.author.id,
      type: "member",
      allow: 17825808
    },
    // This bot
    {
      id: client.user.id,
      type: "member",
      allow: 22021136
    }
  ]);

  try {
    channel.edit({name: channelName, bitrate: 64000, userLimit: optionValues["max"] ? Number(optionValues["max"][0]) : 0});
    channel.createInvite().then(invite => {
      message.channel.send(`Created ${channelName}. It will be removed after 30 seconds of inactivity. Invite link to voice channel: ${invite.url}`);
    });
  } catch(e) {
    client.log(e);
  }

  const voiceChannels = client.voiceChannels.get(message.guild.id);
  voiceChannels.push({
    id: channel.id,
    user: message.author.id,
    time: Date.now() + 30000
  });
  client.voiceChannels.set(message.guild.id, voiceChannels);
};

exports.conf = {
  guildOnly: true,
  permLevel: "User"
};

exports.info = {
  name: "create"
};
