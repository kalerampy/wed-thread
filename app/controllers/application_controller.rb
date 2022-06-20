class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::Serialization
rescue_from ActiveRecord::RecordNotFound, with: :not_found
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?


  


  protected

  def not_found(error)
    render json: {error: "Not found"}, status: :not_found
  end

  def invalid_record(error)
    render json: {error: [error.full]}, status: :unprocessable_entity
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  end

end
