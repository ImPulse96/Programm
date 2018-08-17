module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Commands werden aufgelistet...");
    
    listingCommands(message);
    msg.delete();
};
function listingCommands(message)
{
    message.channel.send("```Folgende Commands sind verfügbar: \n" +
                        "!avatar - Zeigt den eigenen User Avatar // !commands - Zeigt alle verfügbaren Commands \n" +
                        "!rechne Zahl1 Operator Zahl2 - Rechnet Aufgaben // !würfel (zahl) - Würfelt einen (zahl)-seitigen Würfel (Default: 6) \n" +
                        "!ping - Prüft den Ping zum Server // !userinfo - Zeigt Information über sich selbst \n" +
                        "!spende - Zeigt den PayPal.me Link von meinem Ersteller. Zurzeit koste ich 1€ im Monat \n" +
                        "!danke - Jemand bedankt sich beim Bot - !bitte - Jemand sagt Bitte zum Bot \n" +
                        "!wetter Stadtname - Zeigt Wetterinformationen über die Stadt (W) \n \n" +
                        "Legende: (W) = Tiefsttemperatur & Höchsttemperatur ist nur für einen kurzen Zeitraum, nicht über ganzen Tag!```");
}

module.exports.help = {
    name: "commands"
};