Rails.application.routes.draw do
  resources :tasks
  # resources :groups
  # resources :group_widgets, only: [:create, :show, :index]
  # resources :widgets, only: [:create, :show, :index]
  resources :users, only: [:create, :show ]

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'

  get '/me', to: 'users#show'

  delete '/logout', to: 'sessions#destroy'
end
