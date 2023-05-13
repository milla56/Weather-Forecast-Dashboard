function initPage() {

//Variables

searchButton = $("#search-button");
cityList = $(".list-group");
weatherSearch = $(".weather-search");
today = $("$today");
forecast = $("$forecast");
searchInput = $("#search-input");
var city = "";

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



    })
}

























}







 


