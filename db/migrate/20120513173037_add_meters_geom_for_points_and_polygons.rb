class AddMetersGeomForPointsAndPolygons < ActiveRecord::Migration

  def up
    execute "SELECT AddGeometryColumn ('public', 'planet_osm_point','way_2163',2163,'POINT',2)"
    execute "SELECT AddGeometryColumn ('public', 'planet_osm_polygon','way_2163',2163,'POLYGON',2)"

    execute "update planet_osm_point set way_2163 = st_transform(way, 2163);"
    execute "update planet_osm_polygon set way_2163 = st_transform(way, 2163);"

    execute "create index point_way_geom_2163_ix on planet_osm_point using gist (way_2163)"
    execute "create index polygon_way_geom_2163_ix on planet_osm_polygon using gist (way_2163)"

    add_index :planet_way_polygon, :way_area
  end

  def down
    remove_index :planet_way_polygon, :way_area
    remove_column :planet_way_polygon, :way_2163
    remove_column :planet_way_point, :way_2163
  end

end
