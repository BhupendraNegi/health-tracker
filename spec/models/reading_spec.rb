require 'rails_helper'

RSpec.describe Reading, type: :model do
  before(:all) do
    @user1 = create(:user)
    @reading1 = create(:reading, user: @user1)
  end

  it "is valid with valid attributes" do
    expect(@reading1).to be_valid
  end
  
  it "is not valid without a user" do 
    reading2 = build(:reading, user: nil)
    expect(reading2).to_not be_valid
  end
  
  it "is not valid without an level" do
    reading2 = build(:reading, user: @user1, level: nil)
    expect(reading2).to_not be_valid
  end

  it "return readings for a given date" do
    reading2 = create(:reading, user: @user1, created_at: Time.zone.now.yesterday)
    reading3 = create(:reading, user: @user1, created_at: Time.zone.now)
    reading4 = create(:reading, user: @user1, created_at: Time.zone.now)
    todays_reading = Reading.of_date(Date.today)
    expect(todays_reading).to include(reading3, reading4)
    expect(todays_reading).to_not include(reading2)
  end

  it "return reading in the given date range" do
    reading2 = create(:reading, user: @user1, created_at: Time.zone.now.yesterday)
    reading3 = create(:reading, user: @user1, created_at: Time.zone.now)
    reading4 = create(:reading, user: @user1, created_at: Time.zone.now)
    todays_reading = Reading.date_wise_details(Date.today, Date.today)
    expect(todays_reading).to include(reading3, reading4)
    expect(todays_reading).to_not include(reading2)
  end

  it "check max readings in a single day" do
    create_list(:reading, 3, user: @user1)
    reading5 = build(:reading, user: @user1)
    expect(reading5).to_not be_valid
  end
end
