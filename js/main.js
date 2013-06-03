/*$.ajaxSetup({
     timeout: 3000
  });*/
  

var homePage = document.getElementById("homePage"),
    page1 = document.getElementById("p1"),
    page2 = document.getElementById("p2"),
    currentPage = homePage;
var curid=0;
var go=1;

    function slidePageFrom(page, from) {
        // Position the page at the starting position of the animation
        page.className = "page " + from;
        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        page.className ="page transition center";
        currentPage.className = "page transition " + (from === "swpleft" ? "swpright" : "swpleft");
        currentPage = page;
    }

   function getIcon(wid,cloud) {
        var icon;
        var forcing=false;
        if (go==3){
          forcing=true;
        }
        go=3;
        if (wid>=200 && wid<250)
            wid=200;
        else if ((wid>=300 && wid<350) || (wid>=520 && wid<523))
            wid=300;
        else if (wid>=500 && wid<505)
            wid=500;
        else if (wid>=600 && wid<622 && wid!=602)
            wid=600;
        else if (wid>=700 && wid<750)
            wid=700;
        else if (wid==800 && cloud>30)
            wid=50;

        switch (wid) {
         case 50:
            icon="cloud-sun";
            go=1;
            break;
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
            icon="snow";
            break;
         case 600:
            icon="snow";
            break;
         case 602:
            icon="snow-heavy";
            break;
         case 700:
            icon="fog";
            break;
         case 800:
            icon="sun";
            go=1;
            break;
         case 801:
            icon="cloud-sun";
            go=1;
            break;
         case 802:
            icon="cloud";
            go=1;
            break;
         case 803:
            icon="clouds";
            go=2;
            break;
         case 804:
            icon="clouds";
            go=2;
            break;
         default: 
            icon="na";
         break;
        }
        if(forcing && go==1){
          go=2;
        }
        return "<i class=\"icon-"+icon+"\"></i>";
    }

function updatep1(id, lon, lat) {
        $("#p11").html('<div class="txtcenter" style="height: 200px;padding-top: 70px;"><span class="pt3"><img src="img/ajax-loader.gif"></span></div>');
        var req;
        var d;
        var color=198;
        if (id>0)
            req="http://api.openweathermap.org/data/2.5/forecast?callback=?&id="+id+"&units=metric";
        else
            req="http://api.openweathermap.org/data/2.5/forecast?callback=?&lon="+lon+"&lat="+lat+"&units=metric";
        $.getJSON(req,function(data){
        //$.getJSON("http://api.openweathermap.org/data/2.5/forecast?callback=?&q=london&units=metric",function(data){

            if (id==0){
                $("#namelocal").html(data.city.name);
                $("#labeltap").html("<span class=\"fs22\">"+data.city.name+"</span>"); 
              }
            
            var htmlstr="";
            for(var i= 0; i < data.list.length; i++){
                    if (data.list[i].dt_txt.substr(11,2)==0){
                        color-=30;
                        d = moment.unix(data.list[i].dt);
                        htmlstr+="<p class=\"txtcenter fs18\">"+d.format("dddd D MMMM")+"</p>";
                    }
                    htmlstr+="<section class=\"line detail c"+color+"\"><aside class=\"pl1\">"+data.list[i].dt_txt.substr(11,2)+"h</aside>"+
                    "<aside>"+Math.round(data.list[i].main.temp)+"°</aside>"+
                    "<aside>-</aside>"+
                    "<aside class=\"mt0\">"+getIcon(data.list[i].weather[0].id,data.list[i].clouds.all)+"</aside>"+
                    "<aside class=\"tar pr1\"><img src=\"img/status"+go+".gif\"></aside></section>";
            }
            $("#p11").html("");
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
    $("#other").click(function(){
      slidePageFrom(page2, 'swpleft');
    })

    $("#forward").click(function(){
      slidePageFrom(homePage, 'swpright');
    })

    $("#backward").click(function(){
      slidePageFrom(homePage, 'swpleft');
    })

    $(".aaa").click(function(){
      var id=$(this).attr('id');
      if (id!=curid){
          if (id>0){
            //Nom en dur dans attribut label
            var label=$(this).attr('label');
            $("#labeltap").html("<span class=\"fs22\">"+label+"</span>"); 
            curid=id;
            updatep1(id, 0, 0);
            }
          else{
            curid=0;
            updatep1(0,lon,lat);
          }
        }
      slidePageFrom(page1, 'swpright');
    })
    $("#loading").html("");
    updatep1(0,lon,lat);
}
//Version Mobile
else {

//Gestion pagination
$("#other").tap(function(){
  slidePageFrom(page2, 'swpleft');
})
$("#forward").tap(function(){
  slidePageFrom(homePage, 'swpright');
})
$("#backward").tap(function(){
  slidePageFrom(homePage, 'swpleft');
})

$("#p1").swipeRight(function(){
  slidePageFrom(homePage, 'swpleft');
})
$("#p2").swipeLeft(function(){
  slidePageFrom(homePage, 'swpright');
})
$("#homePage").swipeLeft(function(){
  slidePageFrom(page1, 'swpright');
})
$("#homePage").swipeRight(function(){
  slidePageFrom(page2, 'swpleft');
})



$(".aaa").tap(function(){
      var id=$(this).attr('id');
      if (id!=curid){
          if (id>0){
            //Nom en dur dans attribut label
            var label=$(this).attr('label');
            $("#labeltap").html("<span class=\"fs22\">"+label+"</span>"); 
            curid=id;
            updatep1(id, 0, 0);
            }
          else{
            curid=0;
            updatep1(0,lon,lat);
          }
        }
      slidePageFrom(page1, 'swpright');
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

        	lat = position.coords.latitude;
        	lon = position.coords.longitude;
          $("#loading").html("");
          updatep1(0,lon,lat);

		//})
		//.error(function() { alert("Service indisponible"); });

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        $("#labeltap").html("ERREUR");
    }
}

});
