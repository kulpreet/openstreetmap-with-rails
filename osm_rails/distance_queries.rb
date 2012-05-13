module DistanceQueries
    
  def self.geojson_within_distance(distance, from)
    PlanetOsmPoint.find_by_sql("(select st_asgeojson(way) geom from planet_osm_polygon where st_dwithin(st_transform(st_geomfromtext('POINT(#{from[:lng]} #{from[:lat]})', 4269), 2163), way_2163, #{distance}) and way_area < 5000) union (select st_asgeojson(way) geom from planet_osm_point where st_dwithin(st_transform(st_geomfromtext('POINT(#{from[:lng]} #{from[:lat]})', 4269), 2163), way_2163, #{distance}));")
  end
  
end
