function initPage() {

//Variables

searchButton = $("#search-button");
cityList = $(".list-group");
weatherSearch = $(".weather-search");
today = $("$today");
forecast = $("$forecast");
searchInput = $("#search-input");
var city = "";

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
        
    // TODAY'S DATE
    var todayDate = $("<p>");
    todayDate.text(moment().format('dddd, MMM Do YYYY'));
    today.append(todayDate);
    
    // Weather Icon for current day
    var weatherImg = [];
    weatherImg.attr("src", "https://openweathermap.org/img/wn/" + (response.weather[0].icon) + "@2x.png");
    today.append(weatherImg);

      // TEMPERATURE IN CELSIUS 
      function tempC(C) {return Math.floor(((C - 32) * 5) / 9)}
      var currentTemp = "";
      currentTemp.text("Temperature " + tempC(response.main.temp)+ "&#x2103;");
      today.append(currentTemp);

      //Wind
      var currentWind = "";
      currentWind.text("Wind Speed " + (response.wind.speed) + " km/h");
      today.append(currentWind);

      //Humidity
      var currentHumidty = "";
      currentHumidty.text("Humidity " + (response.main.humidity) + " %");
      today.append(currentHumidty);



    })
}

























}







 


