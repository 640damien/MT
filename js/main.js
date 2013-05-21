/*$.ajaxSetup({
     timeout: 3000
  });*/
  

var homePage = document.getElementById("homePage"),
    page1 = document.getElementById("p1"),
    page2 = document.getElementById("p2"),
    currentPage = homePage;

    function slidePageFrom(page, from) {
        // Position the page at the starting position of the animation
        page.className = "page " + from;
        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        page.className ="page transition center";
        currentPage.className = "page transition " + (from === "left" ? "right" : "left");
        currentPage = page;
    }



Zepto(function($){

//Gestion pagination
$("#about").click(function(){
  slidePageFrom(page1, 'right');
})

$("#other").tap(function(){
  slidePageFrom(page2, 'left');
})

var lon=-0.64129;
var lat=44.810108;


if(screen.width > 1000){

//http://api.openweathermap.org/data/2.5/weather?callback=?id=2987805&units=metric
		/*$.getJSON("http://api.openweathermap.org/data/2.5/weather?callback=?&units=metric",{lon:lon,lat:lat},function(data){
			$("#minlocal").append(data.main.temp_min+"~");
			$("#maxlocal").append(data.main.temp_max);
			$("#namelocal").html(data.name);

		})
		.error(function() { alert("Service indisponible!"); });*/

}
else {

    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        //var element = document.getElementById('geolocation');
        /*element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';*/
        	lat = position.coords.latitude;
        	lon = position.coords.longitude;
    		$.getJSON("http://api.openweathermap.org/data/2.5/weather?callback=?&units=metric",{lon:lon,lat:lat},function(data){
			$("#minlocal").append(data.main.temp_min+"~");
			$("#maxlocal").append(data.main.temp_max);
			$("#namelocal").html(data.name);

		})
		.error(function() { alert("Service indisponible"); });

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        $("#namelocal").html("ERREUR");
    }





}

});
