module.exports.run = async (bot, message, args) => {
    message.channel.send("Du hast Geld übrig? Mein Besitzer würde sich über eine Aufmerksamkeit freuen! \n" +
						"https://www.paypal.me/notImPulse");
};

module.exports.help = {
    name: "spende"
};