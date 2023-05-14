function initPage() {

//Variables

searchButton = $("#search-button");
cityList = $(".list-group");
weatherSearch = $(".weather-search");
today = $("$today");
forecast = $("$forecast");
searchInput = $("#search-input");
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
        console.log(response);
        
    // creating div to store all of the information for the current weather
    var todayWeather = $("<div class='today-weather'>");

    // TODAY'S DATE
    var todayDate = $("<p>");
    todayDate.text(moment().format('dddd, MMM Do YYYY'));
    todayWeather.append(todayDate);
    
    // Weather Icon for current day
    var weatherImg = response.weather[0].icon;
    var weatherIcon= $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
    todayWeather.append(weatherIcon);

      // TEMPERATURE IN CELSIUS 
     //   var tempC = response.main.temp - 273.15; another way to find the temp in celsius
    
      function tempC(C) {return Math.floor(((C - 32) * 5) / 9)}    
      var currentTemp=$("<p>").text("Temperature " + tempC(response.main.temp)+ "&#x2103;");
      todayWeather.append(currentTemp);

      //Wind
      var currentWind= $("<p>").text("Wind Speed " + (response.wind.speed) + " km/h");
      todayWeather.append(currentWind);

      //Humidity
      var currentHumidty= $("<p>").text("Humidity " + (response.main.humidity) + " %");
      todayWeather.append(currentHumidty);
     
      // Prepend today's weather to today-class in html
      today.prepend(todayWeather);
    })
}

// 5 day forecast
function forecast(cityid){
 var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
 $.ajax({
    url:forcastURL,
    method:"GET"
}).then(function(response){

for (i=0; i< response.list.length; i++){
    // DIV class for forecast Weather
    var forecastWeather = $("<div class='forecast-weather'>");

    // Date- forecast
    
    var forecastDate = $("<h4>");
    forecastDate = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
    forecastWeather.append(forecastDate);

     // Forecast Weather Icon
     var forecastIcon= $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list.weather[0].icon+ "@2x.png");
     forecastWeather.append(forecastIcon);

     //Forecast Temp
     var forecastTemp = $("<p>").text("Temperature " + tempC(response.main.temp)+ "&#x2103;");
     forecastWeather.append(forecastTemp);

     //Forecast Wind Speed
     var forecastWind = $("<p>").text("Wind Speed " + (response.wind.speed) + " km/h");
     forecastWeather.append(forecastWind);

     // Forecast Humidity
     var forecastHumidity = $("<p>").text("Humidity " + (response.main.humidity) + " %");
     forecastWeather.append(forecastHumidity);

}

}



)}


// add the passed city on the search history
// function addList(c){
//     var listEl = $("<li>"+c.toUpperCase()+"</li>");
//     $(listEl).attr("class","list-group");
//     $(listEl).attr("data-value",c.toUpperCase());
//     cityList.append(listEl);
//  }

// // display city name again when in clicked in search history
// function historySearch(event){
//     var liEl = event.target;
//     if(event.target.matches("li")){
//         city = liEl.textContent.trim();
//         currentWeather(city);
//     }
// }


// render function
function renderButtons(){
    cityList.empty();

    for (var i=0; i<city.length; i++){
        var cityButton = $("<button>");
        cityButton.addClass("city-button");
        cityButton.attr("data-name",city[i]);
        cityButton.text(city[i]);
        cityList.append(cityButton);

    }

}

// search button 
searchButton.on("click", function(event){
    event.preventDefault();
    
    var cityInput = $("#search-input").val().trim();
    city.push(cityInput);
    renderButtons();
})























}







 


