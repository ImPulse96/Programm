/*

KNOWN BUGS:
Wetter API: Wenn Wetter Daten um 23:50 sind, wird 25:50 Uhr angezeigt wegen der +2 Hours // Vermutlich gelöst
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

bot.on("ready", async () => {
    console.log(`${bot.user.username} has started for Kikis!`);
    console.log("-------------------------------------------------------");     

    bot.user.setActivity(" mit Code");
});

bot.on("message", async message =>
{
    console.log("message.channel.id: " + message.channel.id); //CHANNEL ID VON BOT CHANNEL BEKOMMEN!
    if(message.author.bot) return; // Wenn der Author ein Bot ist -> ignorieren
    if(message.channel.type === "dm") return console.log("Private Nachricht von " + message.author.username + "." + " Nachricht: " + message); // Wenn es per private Nachricht geschrieben wird -> ignorieren
    if(message.channel.id != botSettings.textChannelKiki) return;
    
    let messageArray = message.content.split(" "); //Filtert die Nachricht in Strings (Hello World -> "Hello", "World")
    let command = messageArray[0].toLowerCase(); //Speichert den ersten String in variable "command"
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return; // Wenn command nicht mit "!" anfängt -> ignorieren        

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
});

bot.login(botSettings.tokenKiki);