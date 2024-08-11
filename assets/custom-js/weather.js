
// Weather icon font: https://erikflowers.github.io/weather-icons/
// Weather API: https://open-meteo.com/en/docs
// One mapping: https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
/* WMO codes from open-meteo
0            Sunny or Clear sky
1, 2, 3      Mainly clear, partly cloudy, and overcast
45, 48       Fog and depositing rime fog
51, 53, 55   Drizzle: Light, moderate, and dense intensity
56, 57       Freezing Drizzle: Light and dense intensity
61, 63, 65   Rain: Slight, moderate and heavy intensity
66, 67       Freezing Rain: Light and heavy intensity
71, 73, 75   Snow fall: Slight, moderate, and heavy intensity
77           Snow grains
80, 81, 82   Rain showers: Slight, moderate, and violent
85, 86       Snow showers slight and heavy
95           Thunderstorm: Slight or moderate
96, 99       Thunderstorm with slight and heavy hail
*/

wmo_map = {
     "0":{ "day":{ "description":"Sunny", "image":"/assets/svg/wi-day-sunny.svg" },
         "night":{ "description":"Clear", "image":"/assets/svg/wi-night-clear.svg" } },
     "1":{ "day":{ "description":"Mainly Sunny", "image":"/assets/svg/wi-day-sunny.svg" },
         "night":{ "description":"Mainly Clear", "image":"/assets/svg/wi-night-clear.svg" } },
     "2":{ "day":{ "description":"Partly Cloudy", "image":"/assets/svg/wi-day-cloudy.svg" },
         "night":{ "description":"Partly Cloudy", "image":"/assets/svg/wi-night-partly-cloudy.svg" } },
     "3":{ "day":{ "description":"Overcast", "image":"/assets/svg/wi-day-sunny-overcast.svg" },
         "night":{ "description":"Overcast", "image":"/assets/svg/wi-night-cloudy.svg" } },
    "45":{ "day":{ "description":"Foggy", "image":"/assets/svg/wi-day-fog.svg" },
         "night":{ "description":"Foggy", "image":"/assets/svg/wi-night-fog.svg" } },
    "48":{ "day":{ "description":"Rime Fog", "image":"/assets/svg/wi-day-fog.svg" },
         "night":{ "description":"Rime Fog", "image":"/assets/svg/wi-night-fog.svg" } },
    "51":{ "day":{ "description":"Light Drizzle", "image":"/assets/svg/wi-rain-mix.svg" },
         "night":{ "description":"Light Drizzle", "image":"/assets/svg/wi-rain-mix.svg" } },
    "53":{ "day":{ "description":"Drizzle", "image":"/assets/svg/wi-rain-mix.svg" },
         "night":{ "description":"Drizzle", "image":"/assets/svg/wi-rain-mix.svg" } },
    "55":{ "day":{ "description":"Heavy Drizzle", "image":"/assets/svg/wi-rain-mix.svg" },
         "night":{ "description":"Heavy Drizzle", "image":"/assets/svg/wi-rain-mix.svg" } },
    "56":{ "day":{ "description":"Light Freezing Drizzle", "image":"/assets/svg/wi-rain-mix.svg" },
         "night":{ "description":"Light Freezing Drizzle", "image":"/assets/svg/wi-rain-mix.svg" } },
    "57":{ "day":{ "description":"Freezing Drizzle", "image":"/assets/svg/wi-rain-mix.svg" },
         "night":{ "description":"Freezing Drizzle", "image":"/assets/svg/wi-rain-mix.svg" } },
    "61":{ "day":{ "description":"Light Rain", "image":"/assets/svg/wi-rain.svg" },
         "night":{ "description":"Light Rain", "image":"/assets/svg/wi-rain.svg" } },
    "63":{ "day":{ "description":"Rain", "image":"/assets/svg/wi-rain.svg" },
         "night":{ "description":"Rain", "image":"/assets/svg/wi-rain.svg" } },
    "65":{ "day":{ "description":"Heavy Rain", "image":"/assets/svg/wi-rain.svg" },
         "night":{ "description":"Heavy Rain", "image":"/assets/svg/wi-rain.svg" } },
    "66":{ "day":{ "description":"Light Freezing Rain", "image":"/assets/svg/wi-rain.svg" },
         "night":{ "description":"Light Freezing Rain", "image":"/assets/svg/wi-rain.svg" } },
    "67":{ "day":{ "description":"Freezing Rain", "image":"/assets/svg/wi-rain.svg" },
         "night":{ "description":"Freezing Rain", "image":"/assets/svg/wi-rain.svg" } },
    "71":{ "day":{ "description":"Light Snow", "image":"/assets/svg/wi-snow.svg" },
         "night":{ "description":"Light Snow", "image":"/assets/svg/wi-snow.svg" } },
    "73":{ "day":{ "description":"Snow", "image":"/assets/svg/wi-snow.svg" },
         "night":{ "description":"Snow", "image":"/assets/svg/wi-snow.svg" } },
    "75":{ "day":{ "description":"Heavy Snow", "image":"/assets/svg/wi-snow.svg" },
         "night":{ "description":"Heavy Snow", "image":"/assets/svg/wi-snow.svg" } },
    "77":{ "day":{ "description":"Snow Grains", "image":"/assets/svg/wi-snow.svg" },
         "night":{ "description":"Snow Grains", "image":"/assets/svg/wi-snow.svg" } },
    "80":{ "day":{ "description":"Light Showers", "image":"/assets/svg/wi-showers.svg" },
         "night":{ "description":"Light Showers", "image":"/assets/svg/wi-showers.svg" } },
    "81":{ "day":{ "description":"Showers", "image":"/assets/svg/wi-showers.svg" },
         "night":{ "description":"Showers", "image":"/assets/svg/wi-showers.svg" } },
    "82":{ "day":{ "description":"Heavy Showers", "image":"/assets/svg/wi-showers.svg" },
         "night":{ "description":"Heavy Showers", "image":"/assets/svg/wi-showers.svg" } },
    "85":{ "day":{ "description":"Light Snow Showers", "image":"/assets/svg/wi-snow.svg" },
         "night":{ "description":"Light Snow Showers", "image":"/assets/svg/wi-snow.svg" } },
    "86":{ "day":{ "description":"Snow Showers", "image":"/assets/svg/wi-snow.svg" },
         "night":{ "description":"Snow Showers", "image":"/assets/svg/wi-snow.svg" } },
    "95":{ "day":{ "description":"Thunderstorm", "image":"/assets/svg/wi-thunderstorm.svg" },
         "night":{ "description":"Thunderstorm", "image":"/assets/svg/wi-thunderstorm.svg" } },
    "96":{ "day":{ "description":"Light Thunderstorms With Hail", "image":"/assets/svg/wi-thunderstorm.svg" },
         "night":{ "description":"Light Thunderstorms With Hail", "image":"/assets/svg/wi-thunderstorm.svg" } },
    "99":{ "day":{ "description":"Thunderstorm With Hail", "image":"/assets/svg/wi-thunderstorm.svg" },
         "night":{ "description":"Thunderstorm With Hail", "image":"/assets/svg/wi-thunderstorm.svg" } }
}

function show_forecast(latitude, longitude, date, time) {
  if (!latitude || !longitude || !date || !time) {
      return
  }

  iso_time = `${date}T${time}`
  url = "https://api.open-meteo.com/v1/forecast?minutely_15=temperature_2m,weather_code,is_day&" +
        `latitude=${latitude}&longitude=${longitude}&start_minutely_15=${iso_time}&end_minutely_15=${iso_time}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      temperature = data.minutely_15.temperature_2m[0]
      units = data.minutely_15_units.temperature_2m
      wmo = data.minutely_15.weather_code[0]
      meridian = data.minutely_15.is_day[0] == 1 ? "day" : "night"
      if (temperature && units) {
        document.getElementById('forecast').style.display = 'table-row'
        document.getElementById('temp').textContent = temperature + " " + units
        document.getElementById('wmo').src = wmo_map[wmo][meridian]["image"]
        document.getElementById('wmo').title = wmo_map[wmo][meridian]["description"]
      }
    })
    .catch(error => {
      console.error('Error fetching data from ' + url + ": ", error);
    });
};

