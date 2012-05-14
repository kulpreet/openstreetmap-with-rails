class PlanetOsmPoint < ActiveRecord::Base

  self.table_name = "planet_osm_point"
  self.primary_key = "osm_id"

  include DistanceQueries
  include FilterOsmColumns

end
