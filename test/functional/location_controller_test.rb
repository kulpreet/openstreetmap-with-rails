require 'test_helper'

class LocationControllerTest < ActionController::TestCase
  test "should get load_for" do
    get :load_for
    assert_response :success
  end

end
