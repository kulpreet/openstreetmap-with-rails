
var osm_rails = (function() {
    
    return {

	init : function () {
	    this.fmt = new OpenLayers.Format.GeoJSON();
	    this.features = [];
	},

	clear_features : function () {
	    _.each( osm_rails.features, function ( location ) {
		vectors.removeFeatures( location );		    
	    });
	    osm_rails.features.splice(0);
	},

	add_features : function ( result ) {
	    _.each( result, function ( location ) {
		ll = osm_rails.fmt.read( location.geom );
		vectors.addFeatures(ll);
		osm_rails.features.push(ll);
	    });
	},

	load_for_point : function (lat, lng) {
	    var request = $.ajax({
		url: '/location/for_point',
		data: {lat: lat, lng: lng},
		type: 'GET',
		dataType: 'json',
	    });
	    
	    request.done( function ( result ) {
		console.log("Loading success..");
		osm_rails.clear_features();
		osm_rails.add_features( result );
	    });
	    
	    request.fail( function () {
		console.log("Error loading location points...");
	    });

	    request.always( function () {
		console.log("Loading completed..");
	    });
	},

	load_for_map : function () {
	    var ll = map.getCenter();
	    osm_rails.load_for_point(ll.lat, ll.lon);
	}

    }

})();