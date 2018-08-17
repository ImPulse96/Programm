module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generiere Avatar...");
    // console.log(args);
    // if(args)
    // {
    //     var username = args;
    //     console.log(username);
    // }
    await message.channel.send("User Avatar von " + message.author);
    await message.channel.send({files: [
        {
            attachment: message.author.displayAvatarURL,
            name: "avatar.png"
        }
        ]});
        msg.delete();
};

module.exports.help = {
    name: "avatar"
};
