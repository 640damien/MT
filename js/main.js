/*$.ajaxSettings({
     timeout: 5000
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
        if (currentPage==homePage){
          window.scrollTo(0,0);
          $("#glo").css('height','2096px');
        }
        else if (currentPage==p2){
          $("#glo").css('height','480px');
        }
        else if (currentPage==p1){
          window.scrollTo(0,0);
          $("#glo").css('height','2676px');
        }
        self.loaction.href="#top";
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
            req="http://api.openweathermap.org/data/2.5/forecast?callback=?&id="+id+"&units=metric&APPID=a90d219c2c01213a00fdc5009ae28778";
        else
            req="http://api.openweathermap.org/data/2.5/forecast?callback=?&lon="+lon+"&lat="+lat+"&units=metric&APPID=a90d219c2c01213a00fdc5009ae28778";
        $.getJSON(req,function(data){
        //$.getJSON("http://api.openweathermap.org/data/2.5/forecast?callback=?&q=london&units=metric",function(data){

            if (id==0){
                $("#loading").html("");
                $("#namelocal").html(data.city.name);
                $("#labeltap").html("<span class=\"fs26\">"+data.city.name+"</span>"); 
              }
            
            var htmlstr="";
            var rain;
            for(var i= 0; i < data.list.length; i++){
                    if (i==0 && id==0){
                      $("#loading").html(getIcon(data.list[i].weather[0].id,data.list[i].clouds.all));
                      $("#loading").removeClass("mt1");
                      $("#loading i").addClass("fs34");

                    }
                    //Changement de jour (heure=0) et pas de première itération
                    if (data.list[i].dt_txt.substr(11,2)==0 && i!=0){
                        color-=20;
                        d = moment.unix(data.list[i].dt);
                        htmlstr+="<p class=\"txtcenter fs18\">"+d.format("dddd D MMMM")+"</p>";
                    }
                    //Sinon si première itération on affiche today
                    else if(i==0){
                      htmlstr+="<p class=\"txtcenter fs18\">Aujourd'hui</p>";
                    }
                    rain="&nbsp;&nbsp;&nbsp;&nbsp;-";
                    if (data.list[i].rain !== undefined){
                      if (data.list[i].rain['3h']!=0){
                        rain=data.list[i].rain['3h']+"mm";
                      }
                    }

                    htmlstr+="<section class=\"line detail c"+color+"\"><aside class=\"pl1\">"+data.list[i].dt_txt.substr(11,2)+"h</aside>"+
                    "<aside>"+Math.round(data.list[i].main.temp)+"°</aside>"+
                    "<aside><p class=\"fs16 mt05\">"+rain+"</p></aside>"+
                    "<aside class=\"mt0\">"+getIcon(data.list[i].weather[0].id,data.list[i].clouds.all)+"</aside>"+
                    "<aside class=\"tar pr1 mt05\"><img src=\"img/status"+go+".png\"></aside></section>";
            }
            $("#p11").html("");
            $("#p11").append(htmlstr);
        })
        //.error(function() { alert("Service indisponible!"); });
}


Zepto(function($){

var data = {
 circuits:[
{id:"6455375",lab:"Abbeville"},
{id:"6615523",lab:"Albi"},
{id:"3027961",lab:"Alès"},
{id:"6441554",lab:"Anneau du Rhin"},
{id:"6432300",lab:"Bordeaux"},
{id:"6425408",lab:"Bourbonnais"},
{id:"6442263",lab:"Bresse"},
{id:"6452008",lab:"Carole"},
{id:"3004838",lab:"Castellet"},
{id:"2972993",lab:"Charade"},
{id:"6425066",lab:"Clastres"},
{id:"6439873",lab:"Croix en Ternois"},
{id:"6428940",lab:"Dijon"},
{id:"6430722",lab:"Dreux"},
{id:"3018166",lab:"Folembray"},
{id:"6451626",lab:"Fontenay-le-Comte"},
{id:"3014177",lab:"Haute Saintonge"},
{id:"6440053",lab:"Issoire"},
{id:"6456476",lab:"La Ferté Gaucher"},
{id:"3027131",lab:"Le Laquais"},
{id:"6451495",lab:"Le Luc"},
{id:"3003603",lab:"Le Mans"},
{id:"6445379",lab:"Le Vigeant"},
{id:"3004359",lab:"Lédenon"},
{id:"3024396",lab:"Les Ecuyers"},
{id:"3014294",lab:"Lohéac"},
{id:"2977719",lab:"Magny-Cours"},
{id:"3036295",lab:"Mas du Clos"},
{id:"6432300",lab:"Mérignac"},
{id:"3031783",lab:"Mornay"},
{id:"3020584",lab:"Nogaro"},
{id:"3001617",lab:"Pau-Arnos"},
{id:"3004838",lab:"Paul Ricard"},
{id:"2983393",lab:"Roussillon"}
]};
var template ="{{#circuits}}<section id={{id}} label=\"{{lab}}\" class=\"aaa line\">" +
  "<aside class=\"mod left w80 mt1 fs22 pl1\">{{lab}}</aside>"+
  "<aside class=\"mod right pl1\"><i class=\"icon-right-open fs34\"></i></aside>"+
"</section>{{/circuits}}";

var html = Mustache.to_html(template, data);
$('#data').html(html);


//Version PC
/*if(screen.width > 1000){

var lon=0.64129;
var lat=44.810108;

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
            $("#labeltap").html("<span class=\"fs26\">"+label+"</span>"); 
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
else {*/

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
            $("#labeltap").html("<span class=\"fs26\">"+label+"</span>"); 
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
      //var options = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true }; 
        //navigator.geolocation.getCurrentPosition(onSuccess3, onError3, options);
        navigator.geolocation.getAccurateCurrentPosition(onSuccess3, onError3, onProgress, {desiredAccuracy:300, maxWait:10000});
    }

    // onSuccess Geolocation
    //
    function onSuccess1(position) {}
    function onSuccess2(position) {}
    function onSuccess3(position) {

        	lat = position.coords.latitude;
        	lon = position.coords.longitude;
          updatep1(0,lon,lat);

		//})
		//.error(function() { alert("Service indisponible"); });

    }

    // onError Callback receives a PositionError object
    //
    function onError1(position) {}
    function onError2(position) {}
    function onError3(error) {
        alert('Merci d\'activer le GPS');
        $("#labeltap").html("ERREUR");
    }
    function onProgress(param) {
    }
//}

});
