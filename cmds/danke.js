module.exports.run = async (bot, message, args) => {
    message.channel.send("Gern geschehen, " + message.author.username + ".");
};

module.exports.help = {
    name: "danke"
};