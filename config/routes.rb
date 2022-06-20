Rails.application.routes.draw do

  get '/current_user', to: 'current_user#index'
  get '/wedding_threads/:id', to: 'message_threads#wedding_threads'
  get '/invite_link/:id', to: 'invites#unique_get'
  post '/invite_link', to: 'invites#invite_post'
  get '/wedding_guests/:id', to: 'weddings#wedding_guests'
  get 'wedding_info/:id', to: 'weddings#wedding_info'
  resources :permissions
  resources :messages
  resources :weddings
  resources :message_threads

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  mount ActionCable.server => '/cable'

end 

# /users is for sign up
