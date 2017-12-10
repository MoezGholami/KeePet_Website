function initMap() {
	var uluru = {lat: 30.2672, lng: -97.7431};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}

var a = <%= posts[0].latitude %>
alert(a);