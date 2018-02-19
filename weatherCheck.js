// engine for c to f to c converter 

    var currentType = "Celcius"; 
    var degree;
    var gradesInfo;
    var part1;
    var part2;

function convertC() {
        
    if (currentType === "Celcius"){
    
      degree = "C";
      currentType = "Fahrenheit";
    
    } else {
    
      degree = "F";
      currentType = "Celcius";
    
    }
    
    var x;
    if (degree == "C") {
        x = gradesInfo * 9 / 5 + 32;
        gradesInfo = Math.round(x);
    } else {
        x = (gradesInfo -32) * 5 / 9;
        gradesInfo = Math.round(x);
    }
  
  document.getElementById("weatherx").innerHTML = part1 + gradesInfo + part3;
  
}


   

$(document).ready(function(){
    
        // LOCATION CHECKER
    
        function displayLocation(latitude,longitude){
        var request = new XMLHttpRequest();

       var method = 'GET';
       var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
       var async = true;

       request.open(method, url, async);
       request.onreadystatechange = function(){
       
        if (request.readyState == 4 && request.status == 200){
        
         var data = JSON.parse(request.responseText);
        
        // alert(request.responseText); // check under which type your city is stored, later comment this line
         
         var addressComponents = data.results[0].address_components;
         
         for (i=0; i < addressComponents.length; i++) {
         
            var types = addressComponents[i].types
         
         //alert(types);
         
         if (types == "locality,political") {
         
            //   alert(addressComponents[i].long_name); // this should be your city, depending on where you are
               document.getElementById("locationx").innerHTML = addressComponents[i].long_name;
         
         }
         
         if (types == "country,political") {
         
            document.getElementById("location2").innerHTML = addressComponents[i].long_name;
         
         }
         
         }
        
        // alert(address.city.short_name);
       
       }
    };
   request.send();
 };
 // LOCATION CHECKER ENDS
 
 // WEATHER CHECKER
 
     
        function displayWeather(latitude,longitude){
        var request = new XMLHttpRequest();

       var method = 'GET';
       var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude+''
       var async = true;

       request.open(method, url, async);
       request.onreadystatechange = function(){
       
        if (request.readyState == 4 && request.status == 200){
        
         var data = JSON.parse(request.responseText);
        
        console.log(data);
        
        gradesInfo = data.main.temp;  //p2
        part1 = "Weather is: "+ data.weather[0].description + " ";  
        part3 = " "+currentType+ ". Wind speed: "+ data.wind.speed;   
        document.getElementById("weatherx").innerHTML = "Weather is: "+ data.weather[0].description + " "+ gradesInfo +" "+currentType+ ". Wind speed: "+ data.wind.speed;
       
        var iconi = data.weather[0].icon;

        document.getElementById('weatherx2').src = iconi;

       }
    };
   request.send();
 };
 
 // WEATHER CHECKER ENDS


 var successCallback = function(position){
 var x = position.coords.latitude;
 var y = position.coords.longitude;
 displayLocation(x,y);
 displayWeather(x,y);
  };
  
  /*
  
  {
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "13",
               "short_name" : "13",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Falzon Street",
               "short_name" : "Falzon St",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Sliema",
               "short_name" : "Sliema",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Malta",
               "short_name" : "MT",
               "types" : [ "country", "political" ]
            }
...
  
  */


 navigator.geolocation.getCurrentPosition(successCallback);

  });
