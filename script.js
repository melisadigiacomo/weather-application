//Create object to store 
let weather = {
    //API key
    APIKey: "YOUR_API_KEY_HERE",
    
    //fetch data from weather API
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.APIKey
        )
        .then((response) => response.json())
        .then((data) => this.showWeather(data));
    },

    //display specific data
    showWeather: function(data) {
        const { name }  = data;
        const { icon, description } = data.weather[0]; //array
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed) //to check
        
        //Display info on document
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + Math.round(speed*3.6) + " km/h";
        
        //Use remove to hide the initial text until it loads truth data 
        document.querySelector(".weather").classList.remove("loading");

        //Search photos from the city
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    //Define a function to search for the weather in search-bar
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

//Click will search the weather by using the search function
document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
});

//Press ENTER in search-bar will search the weather by using the search function
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
});

//When loading the page, make an initial search with truth data
weather.fetchWeather("Buenos Aires");