module FilterOsmColumns

  def filter_columns
    self.attributes.select do |name, value| 
      !value.nil? && name !~ /way_2163|way_area|way|osm_id|addr/
    end
  end

end
