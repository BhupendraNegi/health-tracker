Rails.application.routes.draw do

  root 'home#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :glucose_readings
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '*path', to: 'home#index', via: :all
  match '/', to: 'home#index', via: :all
end
