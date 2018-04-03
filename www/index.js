
Backendless.initApp("AFBC8D7A-8A11-C898-FF89-DA475B8FF000","14C4D648-AF3B-0BE7-FF5C-29E1B2392E00");

var watchID;

var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};

//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button clicks
	$('#camera-button').on('click', updatePosition);
	$('#uploadInfo').on('click', uploadInfo);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
	$("#entries").empty();
	
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
	
	// Return today's date and time
		var currentTime = new Date()

	// returns the month (from 0 to 11)
		var month = currentTime.getMonth() + 1

	// returns the day of the month (from 1 to 31)
		var day = currentTime.getDate()

	// returns the year (four digits)
		var year = currentTime.getFullYear()

	// write output MM/dd/yyyy
		var properDate = (day + "/" + month + "/" + year)
	
	//OK. Now we want to update the display with the correct values
	
	$('#date').val(properDate);
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	
	localStorage.setItem("lattext", latitude);
	localStorage.setItem("longtext", longitude);
	localStorage.setItem("date", properDate);
	
	
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

var destinationType; //used sets what should be returned (image date OR file path to image for example)

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	destinationType=navigator.camera.DestinationType;
}

function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI });
}
	
function onPhotoDataSuccess(imageURI) {
	var image = document.getElementById('image');
	image.style.display = 'block';
	image.src = imageURI;
	localStorage.setItem("imageURI", imageURI);
}

function onFail(message) {
      alert('Failed because: ' + message);
}


function uploadInfo (){
	//alert(localStorage.lattext)
	var latnum = parseFloat(localStorage.lattext);
	var longnum = parseFloat(localStorage.longtext);
	var geoEntrybasic = document.getElementById("entry").value;
	var journalImage =(localStorage.imageURI);
	var date = (localStorage.date);
	var geoEntry = '"'+geoEntrybasic+'"';
	
	
	var entry = {
		entry:geoEntry,
		latitude:latnum,
		longitude:longnum,
		fileloc:journalImage,
		entrydate:date,
		
	}
	
	console.log (entry);
	Backendless.Data.of("location").save(entry).then(saved).catch(error);
	
	
	function saved(savedTask) { 
	swal("Nice!", "Your Entry Was Saved!", "success");
	$('#entry').val("");
	image.src ="";
	
	}
	
function error(err) {
    alert(err);
}	
	
}


function getEntries(){
	Backendless.Data.of( "location" ).find().then(processResults).catch(error);

}

function  processResults(entries) {
   
    
    //add each tasks
    for (var i = 0; i < entries.length; i++) { 
        $("#entries").append("<img src=" + entries[i].fileloc+ " style='width:50%;height:auto;' >");
    }
    
    //refresh the listview
    $("#entries").listview('refresh');


}
function error(error) {
    alert(err);
}
