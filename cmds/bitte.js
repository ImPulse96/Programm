module.exports.run = async (bot, message, args) => {
    message.channel.send("Vielen Dank, " + message.author.username + ".");
};

module.exports.help = {
    name: "bitte"
};