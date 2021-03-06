$(document).ready( function () {

    map = new OpenLayers.Map("basicMap");
    
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(-122.42058309307, 37.778795525769).transform( fromProjection, toProjection);
    var zoom           = 18; 
    var extent = new OpenLayers.Bounds(-122.612289428711, 37.7067184448242, -122.281776428223, 37.9298248291016).transform(fromProjection,toProjection);
    
    var mapnik         = new OpenLayers.Layer.OSM("OpenStreetMaps with Rails", "/tiles/${z}/${x}/${y}.png", {restrictedExtent: extent, numZoomLevels: 19});
    
    map.addLayer(mapnik);
    map.setCenter(position, zoom );
    
    vectors = new OpenLayers.Layer.Vector("Locations");
    
    // point = new OpenLayers.Geometry.Point(-13630866.5061813, 4547519.22490819);
    // vectors.addFeatures([new OpenLayers.Feature.Vector(point)]);
    map.addLayer(vectors);

    osm_rails.init();

});