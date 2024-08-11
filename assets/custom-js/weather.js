
// Weather API: https://open-meteo.com/en/docs
// Weather icon font: https://erikflowers.github.io/weather-icons/
/*
0            Clear sky
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
95 *         Thunderstorm: Slight or moderate
96, 99 *     Thunderstorm with slight and heavy hail
*/

// note images can be scaled, e.g.
//  "image":"http://openweathermap.org/img/wn/01d@2x.png"
// from: https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
// see also https://github.com/erikflowers/weather-icons
wmo_map = {
    "0":{
        "day":{
            "description":"Sunny",
            "image":"http://openweathermap.org/img/wn/01d.png"
        },
        "night":{
            "description":"Clear",
            "image":"http://openweathermap.org/img/wn/01n.png"
        }
    },
    "1":{
        "day":{
            "description":"Mainly Sunny",
            "image":"http://openweathermap.org/img/wn/01d.png"
        },
        "night":{
            "description":"Mainly Clear",
            "image":"http://openweathermap.org/img/wn/01n.png"
        }
    },
    "2":{
        "day":{
            "description":"Partly Cloudy",
            "image":"http://openweathermap.org/img/wn/02d.png"
        },
        "night":{
            "description":"Partly Cloudy",
            "image":"http://openweathermap.org/img/wn/02n.png"
        }
    },
    "3":{
        "day":{
            "description":"Cloudy",
            "image":"http://openweathermap.org/img/wn/03d.png"
        },
        "night":{
            "description":"Cloudy",
            "image":"http://openweathermap.org/img/wn/03n.png"
        }
    },
    "45":{
        "day":{
            "description":"Foggy",
            "image":"http://openweathermap.org/img/wn/50d.png"
        },
        "night":{
            "description":"Foggy",
            "image":"http://openweathermap.org/img/wn/50n.png"
        }
    },
    "48":{
        "day":{
            "description":"Rime Fog",
            "image":"http://openweathermap.org/img/wn/50d.png"
        },
        "night":{
            "description":"Rime Fog",
            "image":"http://openweathermap.org/img/wn/50n.png"
        }
    },
    "51":{
        "day":{
            "description":"Light Drizzle",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Light Drizzle",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "53":{
        "day":{
            "description":"Drizzle",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Drizzle",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "55":{
        "day":{
            "description":"Heavy Drizzle",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Heavy Drizzle",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "56":{
        "day":{
            "description":"Light Freezing Drizzle",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Light Freezing Drizzle",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "57":{
        "day":{
            "description":"Freezing Drizzle",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Freezing Drizzle",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "61":{
        "day":{
            "description":"Light Rain",
            "image":"http://openweathermap.org/img/wn/10d.png"
        },
        "night":{
            "description":"Light Rain",
            "image":"http://openweathermap.org/img/wn/10n.png"
        }
    },
    "63":{
        "day":{
            "description":"Rain",
            "image":"http://openweathermap.org/img/wn/10d.png"
        },
        "night":{
            "description":"Rain",
            "image":"http://openweathermap.org/img/wn/10n.png"
        }
    },
    "65":{
        "day":{
            "description":"Heavy Rain",
            "image":"http://openweathermap.org/img/wn/10d.png"
        },
        "night":{
            "description":"Heavy Rain",
            "image":"http://openweathermap.org/img/wn/10n.png"
        }
    },
    "66":{
        "day":{
            "description":"Light Freezing Rain",
            "image":"http://openweathermap.org/img/wn/10d.png"
        },
        "night":{
            "description":"Light Freezing Rain",
            "image":"http://openweathermap.org/img/wn/10n.png"
        }
    },
    "67":{
        "day":{
            "description":"Freezing Rain",
            "image":"http://openweathermap.org/img/wn/10d.png"
        },
        "night":{
            "description":"Freezing Rain",
            "image":"http://openweathermap.org/img/wn/10n.png"
        }
    },
    "71":{
        "day":{
            "description":"Light Snow",
            "image":"http://openweathermap.org/img/wn/13d.png"
        },
        "night":{
            "description":"Light Snow",
            "image":"http://openweathermap.org/img/wn/13n.png"
        }
    },
    "73":{
        "day":{
            "description":"Snow",
            "image":"http://openweathermap.org/img/wn/13d.png"
        },
        "night":{
            "description":"Snow",
            "image":"http://openweathermap.org/img/wn/13n.png"
        }
    },
    "75":{
        "day":{
            "description":"Heavy Snow",
            "image":"http://openweathermap.org/img/wn/13d.png"
        },
        "night":{
            "description":"Heavy Snow",
            "image":"http://openweathermap.org/img/wn/13n.png"
        }
    },
    "77":{
        "day":{
            "description":"Snow Grains",
            "image":"http://openweathermap.org/img/wn/13d.png"
        },
        "night":{
            "description":"Snow Grains",
            "image":"http://openweathermap.org/img/wn/13n.png"
        }
    },
    "80":{
        "day":{
            "description":"Light Showers",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Light Showers",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "81":{
        "day":{
            "description":"Showers",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Showers",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "82":{
        "day":{
            "description":"Heavy Showers",
            "image":"http://openweathermap.org/img/wn/09d.png"
        },
        "night":{
            "description":"Heavy Showers",
            "image":"http://openweathermap.org/img/wn/09n.png"
        }
    },
    "85":{
        "day":{
            "description":"Light Snow Showers",
            "image":"http://openweathermap.org/img/wn/13d.png"
        },
        "night":{
            "description":"Light Snow Showers",
            "image":"http://openweathermap.org/img/wn/13n.png"
        }
    },
    "86":{
        "day":{
            "description":"Snow Showers",
            "image":"http://openweathermap.org/img/wn/13d.png"
        },
        "night":{
            "description":"Snow Showers",
            "image":"http://openweathermap.org/img/wn/13n.png"
        }
    },
    "95":{
        "day":{
            "description":"Thunderstorm",
            "image":"http://openweathermap.org/img/wn/11d.png"
        },
        "night":{
            "description":"Thunderstorm",
            "image":"http://openweathermap.org/img/wn/11n.png"
        }
    },
    "96":{
        "day":{
            "description":"Light Thunderstorms With Hail",
            "image":"http://openweathermap.org/img/wn/11d.png"
        },
        "night":{
            "description":"Light Thunderstorms With Hail",
            "image":"http://openweathermap.org/img/wn/11n.png"
        }
    },
    "99":{
        "day":{
            "description":"Thunderstorm With Hail",
            "image":"http://openweathermap.org/img/wn/11d.png"
        },
        "night":{
            "description":"Thunderstorm With Hail",
            "image":"http://openweathermap.org/img/wn/11n.png"
        }
    }
}

function show_forecast(latitude, longitude, date, time) {
  if (!latitude || !longitude || !date || !time) {
      return
  }

  iso_time = `${date}T${time}`
  url = "https://api.open-meteo.com/v1/forecast?minutely_15=temperature_2m,weather_code&" +
        `latitude=${latitude}&longitude=${longitude}&start_minutely_15=${iso_time}&end_minutely_15=${iso_time}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      temperature = data.minutely_15.temperature_2m[0]
      units = data.minutely_15_units.temperature_2m
      wmo = data.minutely_15.weather_code[0]
      if (temperature && units) {
        document.getElementById('forecast').style.display = 'table-row'
        document.getElementById('temp').textContent = temperature + " " + units
        document.getElementById('wmo').src = wmo_map[wmo]["night"]["image"]
        document.getElementById('wmo').title = wmo_map[wmo]["night"]["description"]
      }
    })
    .catch(error => {
      console.error('Error fetching data from ' + url + ": ", error);
    });
};

