//----------Backendless Initialisation---------------------
Backendless.initApp("AFBC8D7A-8A11-C898-FF89-DA475B8FF000","14C4D648-AF3B-0BE7-FF5C-29E1B2392E00");
$(document).ready(function(){

	var video = document.getElementById("video");
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var videoStream = null;

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

	$("#contacts-button").on('click', function(){

		if($("#contacts").is(":hidden")){

			$.getJSON("data/data.json", function(data){

				$.each(data.contacts, function(index, value){

					$("#contacts ul").append(

						"<li class='topcoat-list__item'>" +
							"<img class='avatar' src='" + value.avatar + "'>" +
							"<div class='name'>" + value.first + " " + value.last + "</div>" +
							"<a href='tel:" + value.phone + "'>" + 
							"<img class='contact' src='img/call.svg'></a>" +
							"<a href='sms:" + value.phone + "'>" + 
							"<img class='contact' src='img/sms.svg'></a>" +
							"<a href='mailto:" + value.email + "'>" +
							"<img class='contact' src='img/email.svg'></a>" +
						"</li>"

					);

				});

			});

			$("#contacts").slideDown();
			$(this).text("Hide Contacts");

		}else{

			$("#contacts").slideUp();
			$(this).text("View Contacts");

		}

	});



	$("#camera-button").on('click', function(){

		$("#video").hide();

		if($("#camera").is(":hidden")){

		

				navigator.getUserMedia(
				
								{video: { facingMode: { exact: "environment" } } },

				function(stream){

					videoStream = stream;
					video.src = window.URL.createObjectURL(stream);

					if($("#gum-error").length != 0){

						$("#gum-error").remove();

					}

					$("#video").show();
					$("#camera").slideDown();

				}, 

				function(e){

					if($("#gum-error").length != 0){

						$("#gum-error").remove();

					}

					$("#snap").hide();

					$("#camera").append("<div id='gum-error' class='error-msg'></div>");
					$("#gum-error").text("Permission Denied");

					$("#camera").slideDown();


				}

			);

			$("#snap").on('click', function(){

				if($("#canvas").is(":hidden")){

					$("#canvas").fadeIn();

				}

				context.drawImage(video, 0, 0, video.width, video.height);

				var base64 = canvas.toDataURL("image/png");

				$("#image-area").append(

					"<a href='" + base64 + "' download><img class='photo' src='" + base64 + "'></a>"
				
				);

				if($("#image-area .photo").length != 0){

					if($("#no-img").length != 0){

						$("#no-img").remove();

					}

					$(".photo").fadeIn();

				}

			});

			$(this).text("Hide Camera");

		}else{

			$("#camera").slideUp(function(){

				if(videoStream != null){

					video.pause();
					video.src = "";

					videoStream.stop();

					$("#canvas").hide();

				}

			});

			$(this).text("Access Camera");

		}

	});

	$("#media-library-button").on('click', function(){

		if($("#image-area").is(":hidden")){

			$("#image-area").fadeIn();
			
			updatePosition()

			$(this).text("Hide Media Library");

			if($("#image-area .photo").length == 0){

				$("#image-area").append("<div id='no-img' class='error-msg'></div>");

				$("#no-img").text("No images to display..");
				
				

			} else{

				$(".photo").fadeIn();

			}

		} else{

			$("#image-area, .photo").fadeOut(function(){

				$("#no-img").remove();

			});

			$(this).text("View Media Library");

		}

	});

});
	$("#createGeoPoint").on('click', function(){
		createGeoPoint()
	
	});











//----------Backendless Initialisation---------------------
Backendless.initApp("AFBC8D7A-8A11-C898-FF89-DA475B8FF000","14C4D648-AF3B-0BE7-FF5C-29E1B2392E00");


//--------------Location Functions---------------------------------
//when the jQuery Mobile page is initialised
var watchID;

var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};

//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button clicks
	//$('#startLocationButton').on('click', updatePosition);
	//$('#stopLocationButton').on('click', stopPosition);
	$('#createGeoPoint').on('click', createGeoPoint);
	$('#uploadPhoto').on('click', uploadPhoto);
	$('#moveFile').on('click', moveFile);
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});



//Call this function when you want to watch for chnages in position
function updatePosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
}

//Call this function when you want to watch for chnages in position
function stopPosition() {
	
	//change time box to show updated message
	$('#time').val("Press the button to get location data");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.clearWatch(watchID);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var time = position.timestamp;
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	
	//localStorage.setItem("time", unixtime);
	localStorage.setItem("lattext", latitude);
	localStorage.setItem("longtext", longitude);
	
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

function createGeoPoint() {
	//alert(localStorage.lattext)
	var latnum = parseFloat(localStorage.lattext);
	var longnum = parseFloat(localStorage.longtext);
	var geoEntry = document.getElementById("entry").value;
	
	var point = {
		latitude: latnum,
		longitude: longnum,
		categories: ["My_Journal"],
		metadata: {"Entry":geoEntry}
	}
	console.log(point);
	
	Backendless.Geo.addPoint( point )
	.then( function( savedGeoPoint ) {
	console.log( "geo point saved " + savedGeoPoint.geopoint.objectId );
	})
	.catch( function( error ) {
	console.log( "error - " + error.message );
	});
}


//------------End of Location Functions---------------------------------

function test() {
	alert(base64);
}