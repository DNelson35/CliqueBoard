Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  # resources :group_widgets, only: [:create, :show, :index]
  # resources :widgets, only: [:create, :show, :index]
  resources :tasks
  resources :users, only: [:update, :index ]
  resources :groups, only: [:create, :show, :index]
  resources :invitations, only: [:create]

  # patch 'users/:id/upload_image', to: 'users#upload_image'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/me', to: 'users#show'
  delete '/logout', to: 'sessions#destroy'
end
