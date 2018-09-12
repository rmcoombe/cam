    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //

    function onDeviceReady() {
        $(document).on('click', '#go', function(){
    var website =  $("#text-basic").val();
    alert(website);
     window.open = cordova.InAppBrowser.open;
         var ref = window.open("http://www."+website, '_blank', 'location=yes');
         ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
         ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
         ref.addEventListener('exit', function(event) { alert(event.type); });
});
    }
