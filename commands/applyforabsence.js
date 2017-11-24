exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const settings = client.settings.get(message.guild.id);
  if(!settings["absence_channel"]) return message.channel.send("No absence channel has been set for this server. Please use the !set command to specify one.");
  const channel = message.guild.channels.get(settings["absence_channel"]);
  const reason = args.join(" ") || "No reason provided.";
  const embed = new Discord.RichEmbed()
    .setAuthor("Absence Application", message.author.avatarURL)
    .setDescription(`**Applicant**: ${message.author.tag} (${message.author})\n**Reason**: ${reason}`)
    .setTimestamp();
  channel.send({embed});
};

exports.conf = {
  guildOnly: true,
  permLevel: "User"
};

exports.info = {
  name: "applyforabsence"
};
