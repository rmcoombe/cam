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

			 navigator.mediaDevices.enumerateDevices()
				.then(devices => {
				var videoDevices = [0,0];
				var videoDeviceIndex = 0;
				devices.forEach(function(device) {
				console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
				if (device.kind == "videoinput") {  
				videoDevices[videoDeviceIndex++] =  device.deviceId;    
				}
			});
			
			var constraints =  {
			deviceId: { exact: videoDevices[0]  } 
			};
			return navigator.mediaDevices.getUserMedia({ video: constraints });
			
			
			
			navigator.getUserMedia(

				{video: true, facingMode: {
				exact: 'environment'
				}},

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

				})	
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