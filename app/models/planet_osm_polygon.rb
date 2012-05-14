class PlanetOsmPolygon < ActiveRecord::Base

  self.table_name = "planet_osm_polygon"
  self.primary_key = "osm_id"

  include DistanceQueries
  include FilterOsmColumns

end
