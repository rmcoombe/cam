//Initialising the connection with Backendless
Backendless.initApp("AFBC8D7A-8A11-C898-FF89-DA475B8FF000", "14C4D648-AF3B-0BE7-FF5C-29E1B2392E00");


var watchID;

//Location Setting Options
var locationOptions = {
    maximumAge: 10000,
    timeout: 6000,
    enableHighAccuracy: true
};

//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {

    //set up listener for button clicks
    $('#uploadInfo').on('click', uploadInfo);

});


//Original code adapted from in class slides. Session 8 Location and Maps. Available 
//at https://worcesterbb.blackboard.com/webapps/blackboard/content/listContent.jsp?course_id=_28334_1&content_id=_847621_1


//Call this function when you want to watch for chnages in position
function updatePosition() {

    //change time box to show updated message
    $('#time').val("Getting data...");

    //Instruct location service to get position with appropriate callbacks
    watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
}


//Function called when the position is successfully determined
function successPosition(position) {



    //Variables extracted from our position
    var time = position.timestamp;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    localStorage.setItem("lattext", latitude);
    localStorage.setItem("longtext", longitude);
    localStorage.setItem("date", properDate);


}

//Function called if the position is not obtained correctly
function failPosition(error) {
    //change time box to show updated message
    swal("Uh Oh", "Failed because: " + err, "error");

}



var destinationType; //used sets what should be returned (image date OR file path to image for example)

document.addEventListener("deviceready", onDeviceReady, false);

//Original code adapted from in class slides. Session 11. Available 
//at https://worcesterbb.blackboard.com/webapps/blackboard/content/listContent.jsp?course_id=_28334_1&content_id=_847626_1

function onDeviceReady() {
    destinationType = navigator.camera.DestinationType;
}

function capturePhoto() {
    updatePosition()
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI
    });
}

function onPhotoDataSuccess(imageURI) {
    var image = document.getElementById('image');
    image.style.display = 'block';
    image.src = imageURI;
    localStorage.setItem("imageURI", imageURI);
}

function onFail(message) {
    swal("Uh Oh", "Failed because: " + message, "error");
}


//Original code adapted from in class slides. Session 14 Social Media & MBaaS. Available 
//at https://worcesterbb.blackboard.com/webapps/blackboard/execute/content/file?cmd=view&content_id=_847653_1&course_id=_28334_1

function uploadInfo() {
    //alert(localStorage.lattext)
    var latnum = parseFloat(localStorage.lattext);
    var longnum = parseFloat(localStorage.longtext);
    var geoEntrybasic = document.getElementById("entry").value;
    var journalImage = (localStorage.imageURI);
    var date = (localStorage.date);
    var geoEntry = '"' + geoEntrybasic + '"';


    var entry = {
        entry: geoEntry,
        latitude: latnum,
        longitude: longnum,
        fileloc: journalImage,
        entrydate: date,

    }

    console.log(entry);
    Backendless.Data.of("location").save(entry).then(saved).catch(error);


    function saved(savedTask) {
        swal("Nice!", "Your Entry Was Saved!", "success");
        $('#entry').val("");
        image.src = "";

    }

    function error(err) {
        swal("Uh Oh", "Failed because: " + err, "error");
    }

}

