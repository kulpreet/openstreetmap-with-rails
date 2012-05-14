
var osm_rails = (function() {
    
    return {

	init : function () {
	    this.fmt = new OpenLayers.Format.GeoJSON();
	    this.features = [];
	    this.selected_feature = null;
	    this.setup_popups();
	},

	attributes_to_s : function ( feature ) {
	    str = "";
	    _.each( _.keys( feature.attributes ), function ( attr ) {
		str +=  "<div>" + attr  + ": " + feature.attributes[attr] + " </div>"
	    });
	    return str;
	},

	on_popup_close : function () {
	    osm_rails.select_control.unselect(osm_rails.selected_feature);
	},
	
	on_feature_select : function ( feature ) {
	    osm_rails.selected_feature = feature;
            var popup = new OpenLayers.Popup.FramedCloud("osm_location_popup",
							 feature.geometry.getBounds().getCenterLonLat(),
							 null,
							 "<div style='font-size:.8em'>" + osm_rails.attributes_to_s(feature) + "</div>",
							 null, true, osm_rails.on_popup_close);
            feature.popup = popup;
            map.addPopup(popup);
	},

	on_feature_unselect : function ( feature ) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            feature.popup = null;
	},

	setup_popups: function () {
            osm_rails.select_control = new OpenLayers.Control.SelectFeature(vectors, {
		onSelect: osm_rails.on_feature_select, 
		onUnselect: osm_rails.on_feature_unselect
	    });
	    map.addControl(osm_rails.select_control);
	    osm_rails.select_control.activate();
	},

	clear_features : function () {
	    _.each( osm_rails.features, function ( location ) {
		vectors.removeFeatures( location );		    
	    });
	    osm_rails.features.splice(0);
	},

	get_location_attributes : function ( location ) {
	    attrs = {};
	    keys = _.keys( location );
	    _.each( keys, function ( k ) {
		if ( k !== 'geometry' ) {
		    attrs[k] = location[k];
		}
	    });
	    return attrs;
	},

	add_features : function ( result ) {
	    _.each( result, function ( location ) {
		attrs = osm_rails.get_location_attributes(location);

		ll = osm_rails.fmt.read(location.geometry)[0];
		ll.attributes = attrs;

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
		osm_rails.clear_features();
		osm_rails.add_features( result );
	    });
	    
	    request.fail( function () {
	    });

	    request.always( function () {
	    });
	},

	load_for_map : function () {
	    var ll = map.getCenter();
	    osm_rails.load_for_point(ll.lat, ll.lon);
	}

    }

})();