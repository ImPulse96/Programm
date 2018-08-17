/* Known Bugs:
    Wenn args ein Wort enthält, ergibt das Ergebnis immer 0
    
    NUMMER 1: zwölf - OPERATOR: hoch - NUMMER 2: vier
    ERGEBNIS: NaN   

*/


module.exports.run = async (bot, message, args) => {
const antwortRechnen = await message.channel.send("Ich überlege mal..");

let nummer1 = args[0];
let operator = args[1];
let nummer2 = args[2];
let nummer3 = args[3];

var ergebnis = 0;


switch(operator)
{
    case "+":
        ergebnis = Number(nummer1) + Number(nummer2);
        break;
    case "plus":
        ergebnis = Number(nummer1) + Number(nummer2);
        break;
    case "-":
        ergebnis = Number(nummer1) - Number(nummer2);
        break;
    case "minus":
        ergebnis = Number(nummer1) - Number(nummer2);
        break;
    case "*":
        ergebnis = Number(nummer1) * Number(nummer2);
        break;
    case "mal":
        ergebnis = Number(nummer1) * Number(nummer2);
        break;
    case "/":
        ergebnis = Number(nummer1) / Number(nummer2);
        break;
    case "geteilt":
        ergebnis = Number(nummer1) / Number(nummer2);
        break;
    case "%":
        ergebnis = Number(nummer2) / 100 * Number(nummer1);
        break;
    case "hoch":
        ergebnis = Math.pow(Number(nummer1), Number(nummer2));
        break;
}

antwortRechnen.delete();
console.log("NUMMER 1: " + nummer1 + " - OPERATOR: " + operator + " - NUMMER 2: " + nummer2);
console.log("ERGEBNIS: " + ergebnis);

if(nummer3 != undefined) return message.channel.send("So gut bin ich noch nicht :(. Nutze bitte nur 2 Zahlen!");
if(nummer1 == undefined || operator == undefined || nummer2 == undefined) return message.channel.send("Fehler! Bitte benutze dieses Schema: \"Zahl1, Operator, Zahl2\"");
if(isNaN(nummer1) || isNaN(nummer2)) return message.channel.send("Fehler! Bitte benutze dieses Schema: \"Zahl1, Operator, Zahl2\"");

message.channel.send("Das Ergebnis ist " + ergebnis + ".");
};

module.exports.help = {
    name: "rechne"
};
