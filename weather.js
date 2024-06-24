const button = document.querySelector("button");//search icon button
const container=document.querySelector(".container");

const handleSearch = () => {
    restoreElements("550px","450px");
    const apiKey = 'e6215acdbce245209a8155939240205'; // My Weatherbit API key
    const input = document.getElementById("input");//input text box
    const city = input.value;
    const img = document.querySelector("img");//weather image
    const numeric_temp = document.getElementById("numeric-temp");//main weather temp. 30degree C
    const myfeelsliketemp = document.getElementById("feelsliketemp");//feels like temperature
    const myhumidity = document.getElementById("humidity-numeric");//numric humidity
    const mywindspeed = document.getElementById("wind-speed-numeric");//wind speed numeric
    const myweathertype = document.getElementById("type");///Haze
    
    if (city == '') {
        return;
    }

function changedimention(height,width){
    container.style.width = width;
    container.style.height = height;
    const hideelements=document.querySelectorAll("#numeric-temp , #degree, #feelslike, .humidity, .wind-speed");
    for (let i = 0; i < hideelements.length; i++) {
        const element = hideelements[i];
        element.style.display='none';
    }
    const errormessage=document.querySelector("#type");
    errormessage.innerHTML="OOPS! Location not found!";
}

function restoreElements(height,width) {
    container.style.width = width;
    container.style.height = height;
    const hideElements = document.querySelectorAll("#numeric-temp, #degree, #feelslike, .humidity, .wind-speed");
    hideElements.forEach(element => {
        element.style.display = ''; // Restore visibility
    });

    const errorMessage = document.querySelector("#type, #numeric-temp, #feelsliketemp, #humidity-numeric, #wind-speed-numeric");
    for (let i = 0; i < errorMessage.length; i++) {
        const element = errorMessage[i];
        element.innerHTML = "____"; // Reset error message
    }
    
     
}



    const apiurl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(apiurl)
        .then(response => {
            if (!response.ok) {
                img.src = "./icons/failed.png";
                changedimention("380px","450px");

                throw new Error('Failed to fetch weather data');
            }
         
            return response.json();
        })
        .then(data => {

            // Extract relevant weather data
            const currentTemperature = data.current.temp_c;
            const feelsLike = data.current.feelslike_c;
            const weatherCondition = data.current.condition.text.toLowerCase();
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_kph;

            if (weatherCondition.includes("clear")  || weatherCondition.includes("sunny")) {
                img.src="./icons/sun.png";
            }
            else if (weatherCondition.includes("rain")) {
                img.src = "./icons/heavy-rain.png";
            }
            else if (weatherCondition.includes("fog") || weatherCondition.includes("mist")) {
                img.src = "./icons/fog.png";
            }
            else if (weatherCondition.includes("cloud") || weatherCondition.includes("overcast")) {
                img.src = "./icons/cloudy.png";
            }
            else if (weatherCondition.includes("partly") || weatherCondition.includes("cloudy")) {
                img.src = "./icons/partly-cloudy.png";
            }
            else if (weatherCondition.includes("snow")) {
                img.src = "./icons/snow.png";
            }
            else if (weatherCondition.includes("storm")) {
                img.src = "./icons/storm.png";
            }
           else {
            img.src="./icons/research.png";
           }
            if (currentTemperature < 5) {
                img.src = "./icons/very-cold.png";
            }
            
            console.log('Current temperature:', currentTemperature + '°C');
            console.log('Feels like:', feelsLike + '°C');
            console.log('Weather condition:', weatherCondition);
            console.log('Humidity:', humidity + '%');
            console.log('Wind speed:', windSpeed + ' km/h');


            numeric_temp.innerHTML = currentTemperature;
            myfeelsliketemp.innerHTML = feelsLike;
            myhumidity.innerHTML = humidity;
            mywindspeed.innerHTML = windSpeed;
            myweathertype.innerHTML = weatherCondition;

            
            
        })
        .catch(error => {
            console.error('Error:', error.message);
        });

};


button.addEventListener('click', handleSearch);//event listener for search icon click


input.addEventListener('keydown', (event) => {//event listener for pressing the enter key whose key code is 13
    
    if (event.keyCode === 13) {
        handleSearch();
    }
});

   


















// const apiKey = 'e6215acdbce245209a8155939240205'; // Your WeatherAPI key
// const city = 'Finland'; // City for which you want to get weather data

// // Construct the API request URL
// const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

// // Make the API request
// fetch(apiUrl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to fetch weather data');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Extract relevant weather data
//         const currentTemperature = data.current.temp_c;
//         const feelsLike = data.current.feelslike_c;
//         const weatherCondition = data.current.condition.text;
//         const humidity = data.current.humidity;
//         const windSpeed = data.current.wind_kph;

//         // Display the weather data
//         console.log('Current temperature:', currentTemperature + '°C');
//         console.log('Feels like:', feelsLike + '°C');
//         console.log('Weather condition:', weatherCondition);
//         console.log('Humidity:', humidity + '%');
//         console.log('Wind speed:', windSpeed + ' km/h');
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });


























// function getWeatherByWeatherbit(city) {
//     const apiKey = '5a9d44f694164f66802a5ec03322c3cc'; // Your Weatherbit API key
//     const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

//     return fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch weather data from Weatherbit API');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.data && data.data.length > 0) {
//                 const currentData = data.data[0];
//                 const currentTemp = currentData.temp; // Current temperature
//                 const feelsLike = currentData.app_temp; // Feels like temperature
//                 const humidity = currentData.rh; // Humidity
//                 const minTemp = currentData.min_temp !== undefined ? currentData.min_temp : null; // Min temperature
//                 const maxTemp = currentData.max_temp !== undefined ? currentData.max_temp : null; // Max temperature
//                 const sunrise = currentData.sunrise; // Sunrise
//                 const sunset = currentData.sunset; // Sunset
//                 const windSpeed = currentData.wind_spd; // Wind speed
//                 const windDegrees = currentData.wind_dir; // Wind degrees

//                 return {
//                     currentTemperature: currentTemp,
//                     feelsLike: feelsLike,
//                     humidity: humidity,
//                     minTemperature: minTemp,
//                     maxTemperature: maxTemp,
//                     sunrise: sunrise,
//                     sunset: sunset,
//                     windSpeed: windSpeed,
//                     windDegrees: windDegrees
//                 };
//             } else {
//                 throw new Error(`Error: No weather data available for ${city}`);
//             }
//         })
//         .catch(error => {
//             throw new Error(error.message);
//         });
// }

// // Example usage for Weatherbit
// getWeatherByWeatherbit('Asansol')
//     .then(weatherData => console.log(weatherData))
//     .catch(error => console.error(error));



