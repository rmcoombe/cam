Backendless.initApp("AFBC8D7A-8A11-C898-FF89-DA475B8FF000","14C4D648-AF3B-0BE7-FF5C-29E1B2392E00");

document.addEventListener("DOMContentLoaded", function() {
  getEntries();
});


function getEntries(){
	$("#entries").empty();
	Backendless.Data.of( "location" ).find().then(processResults).catch(error);

}

function  processResults(entries) { 
    //add each tasks
    for (var i = 0; i < entries.length; i++) {
		var caption = entries[i].entry;
		
        $("#entries").append("<a href=" +entries[i].fileloc+ " data-lightbox="+entries[i].fileloc+ " data-title=" +caption+ "><img src=" + entries[i].fileloc + " data-title="+ caption + "/></a>");

		
		
    }
    

}
function error(error) {
    alert(error);
}

function test(){
	console.log(localStorage.item3)
}