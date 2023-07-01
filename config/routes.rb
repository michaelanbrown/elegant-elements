Rails.application.routes.draw do
  
  resources :addresses, only: [:index, :show, :create, :update]
  resources :products
  resources :orders, only: [:index, :show, :create, :update]
  resources :customizations, only: [:index, :show, :create]
  resources :customers, only: [:index, :show, :create]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/authorized_user", to: "customers#show"
  post "/checkout", to: "charges#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
