const apiKey = "c4cd756cef5b45e7bf670957261106"; //U CAN USE TS.
const BASE_URL = "https://api.weatherapi.com/v1/current.json?key=";
const input = document.querySelector("#search_location");
const search_button = document.querySelector("#search");
const container = document.querySelector(".data");
const body = document.querySelector(".body");
const search_URL = "https://api.weatherapi.com/v1/search.json?key=";


async function getCurrWeather() {
    const city = input.value;
    const URL = `${BASE_URL}${apiKey}&q=${city}`;

    localStorage.setItem("city", city);

    if(input.value === '') {
        alert("Please enter a city name");
        return;
    }

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let location = data.location.name;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        let icon = data.current.condition.icon;
        let feelsLike = data.current.feelslike_c;
        let humid = data.current.humidity;
        let windSpeed = data.current.wind_kph;
        let country = data.location.country;
        let chanceOfRain = data.current.chance_of_rain;
        let uvRays = data.current.uv;

        console.log(data);
        // console.log(feelsLike);
        // console.log(condition);

        // const location_div = document.querySelector("#location");
        // location_div.textContent = location;

        // const temp_div = document.querySelector("#temp");
        // temp_div.textContent = `${temp}°C`;


        container.innerHTML = `
        <div class="weather-card">
            <i class="fa-solid fa-location-crosshairs" id= "crosshair"></i>
            <h2 class = "location">${location}, ${country}</h2>
            
            <img src="${icon}" alt="${condition}" class = "icon">
            <div class="temp-condition-container">
                <p class = "feelslike">Feels Like ${feelsLike}°C</p>
                <p class = "temp">${temp}°C</p>
                <p class = "condition">${condition}</p>
            </div>
            
            <div class="humid-wind">
                <div class="humid-container">
                    <i class="fa-solid fa-droplet" id="water-drop"></i>
                    <div class="text-data">
                        <p id="text">Humidity</p>
                        <p class="humid">${humid}%</p>
                    </div>
                </div>
                <div class="wind-container">
                    <i class="fa-solid fa-wind" id="wind-icon"></i>
                    <div class="text-data">
                        <p id="text">Wind speed</p>
                        <p class="wind-speed">${windSpeed} km/h</p>
                    </div>
            
                </div>
            </div>
            <div class="humid-wind">
                <div class="humid-container">
                    <i class="fa-solid fa-cloud-showers-heavy" id="water-drop"></i>
                    <div class="text-data">
                        <p id="text">Chance of rain</p>
                        <p class="humid">${chanceOfRain}%</p>
                    </div>
                </div>
                <div class="wind-container">
                    <i class="fa-solid fa-sun" id="wind-icon"></i>
                    <div class="text-data">
                        <p id="text">UV rays</p>
                        <p class="wind-speed">${uvRays}%</p>
                    </div>
            
                </div>
            </div>
        </div>
        `;

        //BACKGROUND IMAGE CHANGE!!!\/

        if(condition.includes("Sunny")
            || condition.includes("Clear")) {
            document.body.style.backgroundImage = "url('./sunny blur.jpg')";
        } 
        else if(condition.includes("Mist")
            || condition.includes("loudy")
            || condition.includes("cloudy")
            || condition.includes("haze")) {
            document.body.style.backgroundImage = "url('./clowdy blur.jpg')";
        }
        else if(condition.includes("rain")) {
            document.body.style.backgroundImage = "url('./rainy blur.jpg')";
        } 
        else if (condition.includes("Thunder")) {
            document.body.style.backgroundImage = "url('./thunder blur.jpg')";
        }
    }
    catch(error){
        console.log(error);
        alert("No matching location found");
    }
}

//AUTOCOMPLETE PLACES\/

async function getAutocomplete() {
    const city = input.value;

    const URL = `${search_URL}${apiKey}&q=${city}`
    const autocomplete = document.querySelector("#autocomplete");

    localStorage.setItem("city", city);

    if(input.value === '') {
        alert("Please enter a city name");
        return;
    }

    try {
        autocomplete.innerHTML = "";
        autocomplete.style.display = "block";

        let response = await fetch(URL);
        let data = await response.json();

        data.forEach(place => {

            // console.log(place.name);
            const div = document.createElement("div");
            div.classList.add("place-list");

            div.textContent = `${place.name}, ${place.country}`;
            autocomplete.appendChild(div);

            div.addEventListener("click", () => {
            input.value = `${place.name}, ${place.country}`;
            autocomplete.innerHTML = "";
            autocomplete.style.boxShadow = "none";
            getCurrWeather();
        });
        });

        search_button.addEventListener("click", () => {
            getCurrWeather();
            autocomplete.innerHTML = "";
            autocomplete.style.boxShadow = "none";
        });

        input.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                getCurrWeather();
                autocomplete.innerHTML = "";
                autocomplete.style.boxShadow = "none";
            }
        });

    }
    catch(error) {
        console.log(error);
        alert("No matching location found");
    }
}

input.addEventListener("input", () => {
    if(input.value.length < 2) return;
    getAutocomplete();
});

search_button.addEventListener("click", () => {
    getCurrWeather();
});

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        getCurrWeather();
    }
});

window.addEventListener("load", () => {
    const savedCity = localStorage.getItem("city") || "kolkata";

    if(savedCity) {
        input.value = savedCity;
        getCurrWeather();
    }
});











