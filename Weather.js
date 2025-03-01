
const WeatherForm = document.querySelector(".WeatherForm")
const CityName = document.querySelector(".CityName")
const card = document.querySelector(".card")
const apiKey = "a580086245a7180bb923f93478dc46c8"

WeatherForm.addEventListener("submit",async event =>{
    event.preventDefault()
    const city = CityName.value

    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherData(weatherData)

        }
        catch(error){
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city")
    }

})

function displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message
    errorDisplay.classList.add("error")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDisplay)

}

async function getWeatherData(city){

const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
const response  = await fetch(apiURL)

if(!response.ok){
    throw new Error("Could not fetch weather data")
}

    return await response.json()



}

function displayWeatherData(data){
const {name:city ,
       main:{temp,humidity},
       weather:[{description,id}]} = data
    
    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const temperatureDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const weatherDisplay = document.createElement("p")
    const emojiDisplay = document.createElement("p")
    
    cityDisplay.textContent = city
    cityDisplay.classList.add("City")
    card.appendChild(cityDisplay)
       
    temperatureDisplay.textContent = (temp-273.15).toFixed(1) +"°C"
    cityDisplay.classList.add("Temperature")
    card.appendChild(temperatureDisplay)
    
    humidityDisplay.textContent = "Humidity: "+humidity+"%"
    humidityDisplay.classList.add("humidity")
    card.appendChild(humidityDisplay)
    
   weatherDisplay.textContent = description
    weatherDisplay.classList.add("Weather")
    card.appendChild(weatherDisplay)
    
    emojiDisplay.textContent = getEmoji(id)
    emojiDisplay.classList.add("Emoji")
    card.appendChild(emojiDisplay)
    
}

function getEmoji(weatherid){

    switch(true){
        case(weatherid>=200 && weatherid<300) : 
        return "⛈️"
    
    case(weatherid>= 300   && weatherid< 400   ) :
    return "🌧️"
   
    case(weatherid>=500   && weatherid<600   ) :
    return "☔"

    case(weatherid>=600   && weatherid<700   ) :
    return "❄️"

    
    case(weatherid>=700   && weatherid<800   ) :
    return "🌫️"

    case(weatherid===800) :
    return "☀️"

    case(weatherid>=801 && weatherid<810    ) :
    return "☁️"

    default : 
    
    return "❌"
     
}
}