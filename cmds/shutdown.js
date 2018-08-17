module.exports.run = async (bot, message, args) => {
    if(message.author.id != "341198970233815051") return;
    console.log("Shutting down Bot!");
    message.channel.send("Shutting down Bot").then(() => bot.destroy());
};

module.exports.help = {
    name: "shutdown"
};