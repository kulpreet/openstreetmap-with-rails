class LocationController < ApplicationController

  def load
  end

  def for_point
    res = DistanceQueries.geojson_within_distance(300, {:lng => params[:lng], :lat => params[:lat]})
    
    render :json => res
  end

end
