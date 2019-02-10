FactoryGirl.define do
  password = Faker::Internet.password(8)


  factory :user do
    name Faker::Name.last_name
    email Faker::Internet.free_email
    password password
    password_confirmation password
  end
end
