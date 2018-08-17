/*

KNOWN BUGS:
Wetter API: Wenn Wetter Daten um 23:50 sind, wird 25:50 Uhr angezeigt wegen der +2 Hours
Status ins Deutsche übersetzen: "Clear" = "Klarer Himmel", "Rain" = Regen

*/

const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

const fs = require("fs");

const botSettings = require("./botSettings.json");
const prefix = botSettings.prefix;

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);
    
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0)
    {
       console.log("No commands to load!");
       return;
    }
    
    console.log(`Loading ${jsfiles.length} commands: `);
    console.log("-------------------------------------------------------");
    
    jsfiles.forEach((f, i) => {
      let props = require(`./cmds/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
    console.log("-------------------------------------------------------");    
});

var responses = {
    "hallo": "Hallo, ",
    "hello": "Hello, ",
    "moin": "Moin, ",
    "hi": "Hi, "
};



bot.on("ready", async () => {
    console.log(`${bot.user.username} has started successfully!`);
    console.log("-------------------------------------------------------");     
    // console.log(bot.channels);

    // var guild = bot.guilds.get('450084267800920085');
    // if(guild && guild.channels.get('450351931022639104')){
    //     guild.channels.get('450351931022639104').send("!wetter Ahrensburg");
    // } else {
    //     console.log("nope");
    //     //if the bot doesn't have guild with the id guildid
    //     // or if the guild doesn't have the channel with id channelid
    // }
    
    bot.user.setActivity(" und lernt neue Dinge");
});

bot.on("message", async message =>
{
    if(message.author.bot) return;
    if(message.channel.type === "dm")
    {
        let messageArray = message.content.split(" ");
        let nachricht = messageArray[0].toLowerCase();
        
        if(responses[nachricht]) message.channel.send(responses[nachricht] + ` ${message.author.username}.`);
    }
});
bot.on('error', console.error);
bot.on("message", async message =>
{
    // console.log("message.channel.id: " + message.channel.id);
    if(message.author.bot) return; // Wenn der Author ein Bot ist -> ignorieren
    if(message.channel.type === "dm") return; // Wenn es per private Nachricht geschrieben wird -> ignorieren
    
    let messageArray = message.content.split(" "); //Filtert die Nachricht in Strings (Hello World -> "Hello", "World")
    let command = messageArray[0].toLowerCase(); //Speichert den ersten String in variable "command"
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return; // Wenn command nicht mit "!" anfängt -> ignorieren
    if(message.channel.id == botSettings.textChannelKiki) return message.channel.send("Ich bin zurzeit nicht verfügbar! (Mein Chef bearbeitet mich gerade)");
    

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
});

bot.login(botSettings.tokenTest);