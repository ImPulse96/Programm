
const weatherKey = "a5e90a7fbebfa2afa6e98adc402d20ba";
const request = require("request");

let cityList = require("./cityList.json");
var cityAbfrage = false;

var formattedDataTime;
var formattedSunrise;
var formattedSunset;

var city = {
    ahrensburg: "2959083",
    lüneburg: "3221040",
    münster: "2867543",
    hannover: "3221033",
    newyork: "5128581",
    nuuk: "3421319",
    stockholm: "2673730",
    london: "2643743",
    heidelberg: "2907911",
    abudhabi: "292968",
    dubai: "292223",
    hindeloopen: "2747063",
    sneek: "2747063",
    hildesheim: "2904789",
    dorsten: "2935530",
    paris: "2988507",
    islamabad: "1176615",
    köln: "2886242"
};
var cityID = "";
// console.log("Anzahl der geladenen Städte: " + cityList.length);

module.exports.run = async (bot, message, args) => {
    var start = Date.now();
    
    let cityName = args[0].toLowerCase();
    const requestingWeather = await message.channel.send("Wetter Daten werden angefordert:");
    if(cityName == "wetter") return requestingWeather.edit("Stadt nicht gefunden! - Bitte \"!wetter Stadt\" verwenden oder meinen Besitzer kontaktieren um einen neuen Eintrag hinzuzufügen.");
    for(var i = 0; i < cityList.length; i++)
    {
        if(cityList[i].name.toLowerCase() == cityName)
        {
            cityID = cityList[i].id;
            cityAbfrage = true;
        }
    }

    if(city[cityName] || cityAbfrage === true)
    {
        if(city[cityName]) cityID = city[cityName];
        request('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=metric&appid=' + weatherKey, function(error, response, body)
        {
            if(!error && response.statusCode == 200)
            {
                var data = JSON.parse(body);
                var dataTime = data.dt;
                var city = data.name;
              
                var current_temp = data.main.temp;
                var temp_min = data.main.temp_min;
                var temp_max = data.main.temp_max;
                var humidity = data["main"]["humidity"];
              
                var status = data.weather[0].description.toUpperCase();
                switch(status) 
                {
                    case "CLEAR SKY": 
                        status = "☀ Wolkenlos";
                    break;
                    case "RAIN":
                        status = "🌧 Regen";
                    break;
                    case "LIGHT RAIN":
                        status = "🌧 leichter Regen";
                    break;
                    case "MODERATE RAIN":
                        status = "🌧 mäßiger Regen";
                    break; 
                    case "SHOWER RAIN":
                        status = "🌧 Regenschauer";
                    break;
                    case "LIGHT INTENSITY SHOWER RAIN":
                        status = "🌧 leichter Sprühregen";
                    break;                        
                    case "SCATTERED CLOUDS":
                        status = "🌤 vereinzelt Wolken";
                    break;
                    case "BROKEN CLOUDS":
                        status = "🌤 leicht Bewölkt";
                    break;
                    case "OVERCAST CLOUDS":
                        status = "☁ Wolkendecke";
                    break;
                    case "FEW CLOUDS":
                        status = "☁ einige Wolken";
                    break;                    
                    case "MIST":
                        status = "🌫 leichter Nebel";
                    break;
                    case "HAZE":
                        status = "🌫 leichter Nebel";
                    break;
                    case "FOG":
                        status = "🌫 Nebel";
                    break;
                    case "THUNDERSTORM WITH LIGHT RAIN":
                        status = "⛈ Gewitter mit leichtem Regen";
                    break;
                    case "THUNDERSTORM":
                        status = "🌩 Gewitter";
                    break;
                    case "SLEET":
                        status = "🌧🌨 Schneeregen";
                    break;
                }
                var windSpeed = data.wind.speed;
                var sunrise = data["sys"]["sunrise"];
                var sunset = data["sys"]["sunset"];
                
                //Convert Times:
                convertUnixToNow(dataTime, sunrise, sunset);
                
                requestingWeather.delete();
                message.channel.send("Wetter in " + city + ". Daten von " + formattedDataTime + " Uhr. \n" +
                                    "Status: " + status + " - Wind: " + windSpeed + " m/s. \n" +
                                    "🌡 Aktuelle Temperatur: " + current_temp + " °C - Luftfeuchtigkeit: " + humidity + "% \n" +
                                    "⬇🌡 Tiefsttemperatur: " + temp_min + " °C - ⬆🌡 Höchsttemperatur: " + temp_max + "°C \n" +
                                    "🌅 Sonnenaufgang: " + formattedSunrise + " Uhr - 🌇 Sonnenuntergang: " + formattedSunset + " Uhr \n" +
                                    "⚠ ACHTUNG ⚠ - Bitte 4 Stunden auf die Uhrzeiten drauf rechnen bis der Fehler behoben ist!");
                var time = Date.now();
                console.log('Dauer der Abfrage der Wetter API: ' + (time - start) + ' ms.');
                console.log("Wetter angefordert für " + city + " von " + message.author.username);
                console.log("-------------------------------------------------------");
            }
            else
            {
                message.channel.send("!!Wetter Daten konnten nicht geladen werden!!");
                message.channel.send("Kontaktieren Sie bitte meinen Besitzer.");
                console.log("ERROR CODE: " + error);
                
                var end = Date.now();
                console.log('Dauer der Wetterabfrage beim Fehler der Wetter API Anfrage: ' + (end - start) + ' ms.');
            }
        });       
    } else requestingWeather.edit("Stadt nicht gefunden! - Bitte \"!wetter Stadt\" verwenden oder meinen Besitzer kontaktieren um einen neuen Eintrag hinzuzufügen.");
    cityAbfrage = false;
    var end = Date.now();
    console.log('Dauer der Wetterabfrage am Ende des Codes: ' + (end - start) + ' ms.');
};
function convertUnixToNow(dataTime, sunrise, sunset)
{
    var dateDataTime = new Date(dataTime * 1000);
    var dateSunrise = new Date(sunrise * 1000);
    var dateSunset = new Date(sunset * 1000);
    
    var hoursDataTime = dateDataTime.getHours() + 2;
    var hoursSunrise = dateSunrise.getHours() + 2;
    var hoursSunset = dateSunset.getHours() + 2;
    
    if(hoursDataTime >= 24) hoursDataTime - 1;
    if(hoursDataTime <= 9) hoursDataTime = '0' + hoursDataTime;
    
    if(hoursSunrise <= 9) hoursSunrise = '0' + hoursSunrise;
    if(hoursSunset <= 9) hoursSunset = '0' + hoursSunset;
    
    var minutesDataTime = "0" + dateDataTime.getMinutes();
    var minutesSunrise = "0" + dateSunrise.getMinutes();
    var minutesSunset = "0" + dateSunset.getMinutes();
    
    formattedDataTime = hoursDataTime + ':' + minutesDataTime.substr(-2);
    formattedSunrise = hoursSunrise + ':' + minutesSunrise.substr(-2);
    formattedSunset = hoursSunset + ':' + minutesSunset.substr(-2);
    // console.log("Console.log vor return, nach formatieren!");
    return formattedDataTime, formattedSunrise, formattedSunset;
}

module.exports.help = {
    name: "wetter"
};





                // message.channel.send("```Wetter in " + city + ". Daten von " + formattedDataTime + " Uhr");
                // message.channel.send("Status: " + status + " - Wind: " + windSpeed + " m/s");
                // message.channel.send("Aktuelle Temperatur: " + current_temp + " °C - Luftfeuchtigkeit: " + humidity + "%");
                // message.channel.send("Tiefsttemperatur: " + temp_min + " °C - Höchsttemperatur: " + temp_max + " °C");
                // message.channel.send("Sonnenaufgang: " + formattedSunrise + " Uhr - Sonnenuntergang: " + formattedSunset + " Uhr ```");