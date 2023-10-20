// get the api key from openweathermap
const apiKey = "f3250885431f58878f508fbb70480058"

// select the DOM
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

// listener to the search button
// async = javascript will go off and get on with other stuff while this loads, so it doesnt just freeze
// otherwise the program would just wait for the reply and wouldnt do anything else so just freeze
// only used if the information is coming from outside the program
searchBtn.addEventListener('click', async function () {
    const city = cityInput.value;
    // this = awaits for the coordinates
    
    // so that javascript knows to wait longer than it normally would
    const coordinates = await fetchCoordinates(city);
    fetchWeather(coordinates.lat, coordinates.lon);
})

async function fetchCoordinates(city) {
const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
// [list of things called destructuring, how you get to different elements]
const [data] = await response.json();
if (data) {
    return {lat: data.lat, lon: data.lon}
} else {
    return null;
}
}
// function to get weather at a give set of coordinates
async function fetchWeather( lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
        weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperatur:${data.main.temp} C</p>
        `;
    } else {
        weatherInfo.innerHTML = "<p>City not found</p>";
    }
}