// variáveis e seleção de elementos

const apikey= "3774162c9218d043155162df84d50535";
const apiFlagcdnURL = "https://flagcdn.com/h240/";



const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");






const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const flagcdnElement = document.querySelector("#flagcdn")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");



// funções







const getWeatherData = async (city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data


    
}


const showWeatherData = async (city) =>{
    const data = await getWeatherData(city);
    if(!data) return;

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`

    );
    const countryCode = data.sys.country.toLowerCase(); // Obtém o código do país
    flagcdnElement.setAttribute("src", `${apiFlagcdnURL}${countryCode}.png`);
    
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    

  
    weatherContainer.classList.remove("hide");

}

// Eventos
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    const city= cityInput.value;


    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e)=>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
})



