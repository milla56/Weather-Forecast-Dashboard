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
function storeCity(name){
    var savedCity = JSON.parse(localStorage.getItem("sCity")) || [] ;
    savedCity.push(name);
    localStorage.setItem("sCity",JSON.stringify(name));
}

// loads the city list from local storage and calls api to get data for last searched city 
function loadCity() {
    var cityEl = JSON.parse(localStorage.getItem("sCity"));

    if (cityEl !== null) {
        cityList = cityEl;
    }

    renderButtons();

    if (cityList) {
        var thisCity = cityList[cityList.length - 1]
        currentWeather(city);
        forecast(cityid);
    }
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
    
        storeCity(response.name);

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
    var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityid + "&units=metric&appid=" + APIKey;
    $.ajax({
       url:forcastURL,
       method:"GET"
   }).then(function(data){

    // array for the next five days 
    var forecastDays = [];

    for (var i = 0; i < 5; i++) {
        let forecastDate = moment().add(i + 1, 'days').format('DD/MM/YYYY');

        forecastDays.push(forecastDate);
    }
       

   // Forecast is empty 
    forecastId.empty();
    
      // for each day  a forecast card is created
       for (var i=0; i< forecastDays.length; i++){
         var dataIndex = i * 8 + 4;
       


        // Five days forecast title 
        var fiveDaysEl = $('<h2>').text('5-Day Forecast:').attr({id: 'five-day-header'});
       

       // DIV class for forecast Weather
       var forecastDiv = $ ("<div>");
       forecastDiv.addClass('col3');

       // DIV card body
       var cardBody = $('<div>').addClass('card-body');
   
    //    // Date- forecast
    //    var forecastDate = $("<h4>");
    //    forecastDate = new Date((dataList.dt)*1000).toLocaleDateString();
      
   
        // Forecast Weather Icon
        var forecastIcon= $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.list[dataIndex].weather[0].icon+ "@2x.png");
        forecastIcon.attr("alt", data.list[dataIndex].weather[0].description)
        
   
        //Forecast Temp
        var forecastTemp = $("<p>").text("Temperature " + data.list[dataIndex].main.temp + "\u2103").addClass('card-text');
       
   
        //Forecast Wind Speed
        var forecastWind = $("<p>").text("Wind Speed " + (data.list[dataIndex].wind.speed) + " km/h").addClass('card-text');
        
   
        // Forecast Humidity
        var forecastHumidity = $("<p>").text("Humidity " + (data.list[dataIndex].main.humidity) + " %").addClass('card-text');
        
   
         // Appending all forecast elements to the div element
    //   forecastDiv.append(fiveDaysEl);
      forecastDiv.append(cardBody);
      forecastDiv.append(forecastDays[i]);
      forecastDiv.append(forecastIcon);
      forecastDiv.append(forecastTemp);
      forecastDiv.append(forecastWind);
      forecastDiv.append(forecastHumidity);
      console.log(forecastDiv)

      // Appending the div element to forecast id
      forecastId.append(forecastDiv);
      
         
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
        cityList.append(cityButton);

        // cityButton.on("click", function(){
        //     currentWeather(cityList.value);
        //     })
        
        cityList.on("click", ".city-button",function(){
            var thisCity = $(this)[0].textContent;
            console.log(thisCity, "thisCity");
            currentWeather(thisCity);
            forecast(thisCity);
            })
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



// calling current weather and forecast weather function
// function display() {
//     var thisCity = $(this).attr("data-city");

//     todayId.empty();
//     currentWeather(city);

//     forecastId.empty();
//     forecast(cityid);
    
// }



















}
initPage();







 


