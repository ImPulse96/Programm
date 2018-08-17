module.exports.run = async (bot, message, args) => {
    let zahl = args[0];
    var gewürfelt;

    if(args[0] == undefined)
    {
        gewürfelt = Math.floor(Math.random() * 6 + 1);
        message.channel.send("Ich habe mit einem 6 seitigen Würfel eine " + gewürfelt + " gewürfelt.");
    }    
    else if(isNaN(zahl))
    {
        return message.channel.send("Fehler! Nur Ganzzahlen sind erlaubt.");
    }
    else
    {
        gewürfelt = Math.floor(Math.random() * zahl + 1);
        message.channel.send("Ich habe mit einem " + zahl + " seitigen Würfel eine " + gewürfelt + " gewürfelt.");    
    }
    
    

};

module.exports.help = {
    name: "würfel"
};