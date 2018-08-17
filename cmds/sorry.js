module.exports.run = async (bot, message, args) => {
    message.channel.send("Ist schon in Ordnung, " + message.author.username + "!");
};

module.exports.help = {
    name: "sorry"
};