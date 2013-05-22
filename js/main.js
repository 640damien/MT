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
        currentPage.className = "page transition " + (from === "left" ? "right2" : "left");
        currentPage = page;
    }

   function getIcon(id) {
        var icon;
        if (id>=200 && id<250)
            id=200;
        else if ((id>=300 && id<350) || (id>=520 && id<523))
            id=300;
        else if (id>=500 && id<505)
            id=500;
        else if (id>=600 && id<622 && id!=602)
            id=600;
        else if (id>=700 && id<750)
            id=700;

        switch (id) {
         case 200:
            icon="clouds-flash";
            break;
         case 300:
            icon="drizzle";
            break;
         case 500:
            icon="rain";
            break;
         case 511:
            icon="snow-heavy";
            break;
         case 600:
            icon="snow";
            break;
         case 602:
            icon="snow";
            break;
         case 700:
            icon="fog";
            break;
         case 800:
            icon="sun";
            break;
         case 801:
            icon="cloud-sun";
            break;
         case 802:
            icon="cloud";
            break;
         case 803:
            icon="clouds";
            break;
         case 804:
            icon="clouds";
            break;
         default: 
            icon="na";
         break;
        }
        return "<i class=\"icon-"+icon+"\"></i>";
    }

function updatep1(id, lon, lat) {
        $("#p11").html("");
        var req;
        if (id>0)
            req="http://api.openweathermap.org/data/2.5/forecast?callback=?&id="+id+"&units=metric";
        else
            req="http://api.openweathermap.org/data/2.5/forecast?callback=?&lon="+lon+"&lat="+lat+"&units=metric";
        $.getJSON(req,function(data){
        //$.getJSON("http://api.openweathermap.org/data/2.5/forecast?callback=?&q=london&units=metric",function(data){

            if (id==0)
                $("#namelocal").html(data.city.name);
            
            $("#nametap").html("<span class=\"fs22\">"+data.city.name+"</span>");
            var htmlstr="";
            for(var i= 0; i < data.list.length; i++){
                    htmlstr+="<section class=\"line detail\"><aside class=\"pl1\">"+data.list[i].dt_txt.substr(11,2)+"h</aside>"+
                    "<aside>"+Math.round(data.list[i].main.temp)+"°</aside>"+
                    "<aside>-</aside>"+
                    "<aside class=\"mt0\">"+getIcon(data.list[i].weather[0].id)+"</aside>"+
                    "<aside class=\"tar pr1\">GO!</aside></section>";
            }
            $("#p11").append(htmlstr);
        })
        //.error(function() { alert("Service indisponible!"); });
}


Zepto(function($){

var lon=-0.64129;
var lat=44.810108;

//Version PC
if(screen.width > 1000){
    //Gestion pagination
    $("#about").click(function(){
      slidePageFrom(page1, 'right2');
    })

    $("#other").click(function(){
      slidePageFrom(page2, 'left');
    })

    $("#forward").click(function(){
      slidePageFrom(homePage, 'right2');
    })

    $("#backward").click(function(){
      slidePageFrom(homePage, 'left');
    })

    $(".aaa").click(function(){
      var id=$(this).attr('id');
      //alert(id);
      if (id>0){
        updatep1(id, 0, 0);
        }
      else{
        updatep1(0,lon,lat);
      }
      slidePageFrom(page1, 'right2');
    })

    updatep1(0,lon,lat);
}
//Version Mobile
else {

//Gestion pagination
$("#about").tap(function(){
  slidePageFrom(page1, 'right2');
})

$("#other").tap(function(){
  slidePageFrom(page2, 'left');
})
$("#forward").tap(function(){
  slidePageFrom(homePage, 'right2');
})

$("#backward").tap(function(){
  slidePageFrom(homePage, 'left');
})

$("#p1").swipeLeft(function(){
  slidePageFrom(homePage, 'left');
})
$("#p2").swipeRight(function(){
  slidePageFrom(homePage, 'right');
})
$("#homePage").swipeLeft(function(){
  slidePageFrom(page2, 'left');
})
$("#homePage").swipeRight(function(){
  slidePageFrom(page1, 'right2');
})



$(".aaa").tap(function(){
  var id=$(this).attr('id');
  //alert(id);
  if (id>0){
    updatep1(id, 0, 0);
    }
  else{
    updatep1(0,lon,lat);
  }
  slidePageFrom(page1, 'right2');
})



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
            updatep1(0,lon,lat);
    		/*$.getJSON("http://api.openweathermap.org/data/2.5/weather?callback=?&units=metric",{lon:lon,lat:lat},function(data){
			$("#minlocal").append(data.main.temp_min+"~");
			$("#maxlocal").append(data.main.temp_max);
			$("#namelocal").html(data.name);*/

		//})
		//.error(function() { alert("Service indisponible"); });

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
