Rails.application.routes.draw do
  resources :tasks
  # resources :group_widgets, only: [:create, :show, :index]
  # resources :widgets, only: [:create, :show, :index]
  resources :users, only: [:create, :show, :update ]
  resources :groups, only: [:create, :show, :index]

  # patch 'users/:id/upload_image', to: 'users#upload_image'
  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'

  get '/me', to: 'users#show'

  delete '/logout', to: 'sessions#destroy'
end
