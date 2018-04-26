Backendless.initApp("AFBC8D7A-8A11-C898-FF89-DA475B8FF000","14C4D648-AF3B-0BE7-FF5C-29E1B2392E00");

document.addEventListener("DOMContentLoaded", function() {
  getEntries();
});


function getEntries(){
	Backendless.Data.of( "location" ).find().then(processResults).catch(error);

}

function  processResults(entries) { 
    //add each tasks
	var places = [];
	
    for (var i = 0; i < entries.length; i++) {
		
		 
	places.push("{Position: new google.maps.LatLng(" + entries[i].latitude +","+ entries[i].longitude+ "), title:" + entries[i].entry +"}"); 
		
    }
    console.log(places);

}
function error(error) {
    swal("Uh Oh", "Failed because: " + error, "error");
}

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: new google.maps.LatLng(-33.91722, 151.23064),
          mapTypeId: 'roadmap'
        });

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        // Create markers.
        features.forEach(function(places) {
          var marker = new google.maps.Marker({
            position: places.position,
            
            map: map
          });
        });
      }
    