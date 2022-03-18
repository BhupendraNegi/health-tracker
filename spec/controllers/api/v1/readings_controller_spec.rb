require 'rails_helper'
require_relative "../../../support/devise"

RSpec.describe Api::V1::ReadingsController do
  # describe "GET #index" do
  #   before do
  #     login_user
  #     get :index
  #   end

  #   it "returns http success" do
  #     expect(response).to have_http_status(:success)
  #   end

  #   # it "JSON body response contains expected recipe attributes" do
  #   #   json_response = JSON.parse(response.body)
  #   #   expect(hash_body.keys).to match_array([:id, :ingredients, :instructions])
  #   # end
  # 

  describe "GET /" do
    login_user

    context "from login user" do
      it "should return 200:OK" do
        get :index
        expect(response).to have_http_status(:success)
      end
    end
  end
end
