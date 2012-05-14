module DistanceQueries
    
  def self.geojson_within_distance(distance, from)
    ret = PlanetOsmPolygon.find_by_sql("select *, st_asgeojson(way) geometry from planet_osm_polygon where st_dwithin(st_transform(st_geomfromtext('POINT(#{from[:lng]} #{from[:lat]})', 900913), 2163), way_2163, #{distance}) and boundary is null")
    ret += PlanetOsmPoint.find_by_sql("select *, st_asgeojson(way) geometry from planet_osm_point where st_dwithin(st_transform(st_geomfromtext('POINT(#{from[:lng]} #{from[:lat]})', 900913), 2163), way_2163, #{distance})")
    ret.map! do |location|
      location.filter_columns
    end
  end
  
end
