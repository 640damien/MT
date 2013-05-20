$.ajaxSetup({
     timeout: 3000
  });
  
$(document).ready(function() {

var lon=-0.64129;
var lat=44.810108;

if(screen.width > 1000){

//http://api.openweathermap.org/data/2.5/weather?callback=?id=2987805&units=metric
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?callback=?&units=metric",{lon:lon,lat:lat},function(data){
			$("#minlocal").append(data.main.temp_min+"~");
			$("#maxlocal").append(data.main.temp_max);
			$("#namelocal").html(data.name);

		})
		.error(function() { alert("Service indisponible!"); });

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
        var element = document.getElementById('geolocation');
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
