Rails.application.routes.draw do

  get '/current_user', to: 'current_user#index'
  get '/wedding_threads/:id', to: 'message_threads#wedding_threads'
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
