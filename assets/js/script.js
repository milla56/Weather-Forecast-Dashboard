function initPage() {

//Variables

var searchButton = $("#search-button");
var cityList = $(".list-group");
var weatherSearch = $(".weather-search");
var todayId = $("#today");
var forecastId = $("#forecast");
var searchInput = $("#search-input");
var historyEl = ("#history");
var city = [];

//store the cities in local storage
function storeCity(){
    localStorage.setItem(sCity,JSON.stringify(".list-group"));
}

//API KEY
var APIKey = "758974132e2e4da4f5697230761019a3"; 


//getting the data from from server
function currentWeather(city){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(response){
        console.log(queryURL);
    
        
    // creating div to store all of the information for the current weather
    var todayWeather = $("<div class= 'card-body'>");
    todayWeather.addClass("border border-dark rounded");

    // Current City Name
    var currentCity = $(" <h3 id='city-name' class='city-name' align-middle>").text(response.name);
    todayWeather.append(currentCity);

    // TODAY'S DATE
    var todayDate = $("<p>");
    todayDate.text(moment().format('dddd, MMM Do YYYY'));
    todayWeather.append(todayDate);
    
    // Weather Icon for current day
    var weatherImg = response.weather[0].icon;
    var weatherIcon= $("<img id='weatherImg'>").attr("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
    weatherIcon.attr("alt", response.weather[0].description);
    todayWeather.append(weatherIcon);

      // TEMPERATURE IN CELSIUS 
       var tempC = Math.floor(response.main.temp - 273.15); 
    
    //   function tempC(C) {return Math.floor(((C - 32) * 5) / 9)}    
      var currentTemp=$("<p id='temperature'></p>").text("Temperature " + tempC + " ℃");
      todayWeather.append(currentTemp);

      //Wind
      var currentWind= $("<p id='wind-speed'></p>").text("Wind Speed " + (response.wind.speed) + " km/h");
      todayWeather.append(currentWind);

      //Humidity
      var currentHumidty= $("<p id='humidity'></p>").text("Humidity " + (response.main.humidity) + " %");
      todayWeather.append(currentHumidty);
     
      todayId.html("")
      // Prepend today's weather to today-class in html
      todayId.prepend(todayWeather);
      

      var cityLatitude = response.coord.lat;
      var cityLong = response.coord.lon;
  
    })
}

// 5 day forecast
function forecast(cityid){
 var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
 $.ajax({
    url:forcastURL,
    method:"GET"
}).then(function(data){
    
    var dataList = data.list;
    for (var i=0; i< dataList; i++){
        if (dataList[i].dt_txt.split(' ') [1] === "12:00:00"){

    
    // DIV class for forecast Weather
    var forecastWeather = $ ("<div>");
    forecastWeather.addClass("col-md-2 forecastEl bg-primary text-white m-2 rounded");

    // Date- forecast
    var forecastDate = $("<h4>").text(response.list[i].dt_txt.split(" ")[0]);
    // forecastDate = new Date((dataList.dt)*1000).toLocaleDateString();
    forecastWeather.append(forecastDate);

     // Forecast Weather Icon
     var forecastIcon= $("<img>").attr("src", "https://openweathermap.org/img/wn/" + dataList[i].weather[0].icon+ "@2x.png");
     forecastWeather.append(forecastIcon);

     //Forecast Temp
     var forecastTemp = $("<p>").text("Temperature " + tempC(dataList[i].main.temp)+ "&#x2103;");
     forecastWeather.append(forecastTemp);

     //Forecast Wind Speed
     var forecastWind = $("<p>").text("Wind Speed " + (dataList[i].wind.speed) + " km/h");
     forecastWeather.append(forecastWind);

     // Forecast Humidity
     var forecastHumidity = $("<p>").text("Humidity " + (dataList[i].main.humidity) + " %");
     forecastWeather.append(forecastHumidity);

      // Prepend today's weather to today-class in html
   forecastId.append(forecastWeather);
   
      
        }

}

}

)}



// render function
function renderButtons(){
    cityList.empty();

    for (var i=0; i<city.length; i++){
        var cityButton = $("<button>");
        cityButton.addClass("city-button");
        cityButton.attr("data-name",city[i]);
        cityButton.text(city[i]);
        // cityList.append(cityButton);

        cityButton.on("click", function(){
            currentWeather(city.value);
            
        })
        cityList.append(cityButton);
      
    }
    
}


// search button 
searchButton.on("click", function(event){
    event.preventDefault();

    var cityInput = $("#search-input").val().trim();
    city.push(cityInput); 
    // city=cityInput;
    renderButtons();
    currentWeather(cityInput);
    forecast(cityInput);
    
})























}
initPage();







 


