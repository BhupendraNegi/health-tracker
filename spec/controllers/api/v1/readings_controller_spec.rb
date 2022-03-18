require 'rails_helper'
require_relative "../../../support/devise"

RSpec.describe Api::V1::ReadingsController do
  describe "GET #index" do
    login_user
    context "from login user" do
      it "should return 200:OK" do
        get :index, {}
        expect(response).to have_http_status(:success)
      end

      it "should render json" do
        get :index
        json_response = JSON.parse(response.body)
        expect(response.content_type).to eq "application/json; charset=utf-8"
        expect(json_response).to have_key('message')
      end

      it "should render json with readings" do
        dateRange = { 
          startDate: Date.today.to_s,
          endDate: Date.today.to_s
        }
        date_range = { dateRange: dateRange.to_json }

        get :index, params: date_range
        json_response = JSON.parse(response.body).with_indifferent_access
        expect(response).to have_http_status(:success)
        expect { json_response }.not_to raise_exception
        expect(response.content_type).to eq "application/json; charset=utf-8"
        expect(json_response.keys).to match_array(["data", "maximum", "minimum", "average"])
      end
    end
  end

  describe "GET #new" do
    login_user
    it "returns a success response" do
      get :new
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    login_user
    context "with valid parameters" do
      it "creates a new Reading" do
        expect {
          post :create, params: { reading: { level: 100 } }
        }.to change(Reading, :count).by(1)
      end
    end

    context "with invalid params" do
      it "returns a success response" do
        post :create, params: { reading: { level: nil } }
        json_response = JSON.parse(response.body).with_indifferent_access
        expect { json_response }.not_to raise_exception
      end
    end
  end

  describe "GET #edit" do
    login_user
    it "returns a success response" do
      reading = create(:reading, user: @user)
      get :edit, params: { id: reading.id }
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(response.content_type).to eq "application/json; charset=utf-8"
    end
  end

  describe "PUT #update" do
    login_user
    context "with valid parameters" do
      it "creates a new Reading" do
        reading = create(:reading, user: @user)
        put :update, params: { id: reading.id, reading: { level: 80 } }
        update_reading = Reading.find(reading.id).level
        expect(update_reading).to eq 80
      end
    end

    context "with invalid params" do
      it "returns a success response" do
        reading = create(:reading, user: @user)
        put :update, params: { id: reading.id, reading: { level: nil } }
        json_response = JSON.parse(response.body).with_indifferent_access
        expect { json_response }.not_to raise_exception
      end
    end
  end

  describe "GET #show" do
    login_user
    context "from login user" do
      it "should return 200:OK" do
        reading = create(:reading, user: @user)
        get :show, params: { id: reading.id }
        expect(response).to have_http_status(:success)
      end

      it "should render json" do
        reading = create(:reading, user: @user)
        get :show, params: { id: reading.id }
        json_response = JSON.parse(response.body)
        expect(response.content_type).to eq "application/json; charset=utf-8"
      end

      it "should render json with reading" do
        reading = create(:reading, user: @user)
        get :show, params: { id: reading.id }
        json_response = JSON.parse(response.body).with_indifferent_access
        expect(response).to have_http_status(:success)
        expect { hash_body = json_response }.not_to raise_exception
        expect(response.content_type).to eq "application/json; charset=utf-8"
        expect(json_response.keys).to match_array(["data"])
      end
    end
  end
end
