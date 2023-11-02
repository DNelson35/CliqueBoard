Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  # resources :group_widgets, only: [:create, :show, :index]
  # resources :widgets, only: [:create, :show, :index]
  resources :tasks
  resources :users, only: [:update, :index ]
  resources :groups, only: [:create, :show, :index]
  resources :invitations, only: [:create, :destroy]
  resources :widget_data, only: [:create]
  resources :messages, only: [:create, :destroy]
  resources :conversations, only: [:create, :index]

  # patch 'users/:id/upload_image', to: 'users#upload_image'
  post '/join', to: 'groups#join'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/me', to: 'users#show'
  get '/members', to: 'users#searchable_users'
  delete '/logout', to: 'sessions#destroy'
end
