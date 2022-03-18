FactoryBot.define do  
  factory :user do
    email { "#{SecureRandom.hex(3)}_#{rand(100)}@gmail.com" }
    password { "secret123" }
    password_confirmation { "secret123" }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end

  factory :reading do
    user
    level { rand(100..200) }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end
end
