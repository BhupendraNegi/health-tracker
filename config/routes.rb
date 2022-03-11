Rails.application.routes.draw do

  root 'home#index'
  devise_for :users
  resources :readings, only: :index

  namespace :api do
    namespace :v1 do
      resources :readings
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  match '/readings/*path', to: 'readings#index', via: :all
  match '/*path', to: 'home#index', via: :all
  match '/', to: 'home#index', via: :all
end
