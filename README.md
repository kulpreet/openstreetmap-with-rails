Open Street Maps with Rails
==========


The objectives of this project are to show how to 

	1. Access OSM data from PostGIS using ActiveRecord
	2. Show the data on a map displayed using OpenLayers

Uses
----------
	
	1. Rails 3.2.3
	2. Passenger 3
	3. PostgresSQL and PostGIS

Pre-requisites
----------

  You will need to generate some OSM tiles first.
  
  I used Mapnik to generate the files for the city of San Francisco.
  
  I found the process described
  [here](http://wiki.openstreetmap.org/wiki/Mapnik#Rendering_with_Mapnik)
  really useful.
  
  The link above uses the Python mapnik library to render tiles. But
  really you don't need to worry about how mapnik works, all we want
  to achieve is serve our own OSM tiles and then show markers on it!
  
  There are a good few other resources on how to generate tiles using
  mapnik. You could use any other means to generate the tiles from OSM
  data.


See the [Commit Log](https://github.com/kulpreet/openstreetmap-with-rails/commits/master/)
for how I built this.
