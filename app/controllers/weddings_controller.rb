class WeddingsController < ApplicationController
  before_action :authenticate_user!
  def index
    weddings = User.find(current_user.id).weddings
    render json: weddings, each_serializer: WeddingSerializer, root: false
    
  end

  def show
    weddings = User.find(params[:id]).weddings
    render json: weddings, status: :ok
    #this will render the weddings of the user
  end



  def unique_post
    
  end

  def create
    wedding = Wedding.create!(wedding_params)

    render json: wedding, status: :created
  end

  private

  def wedding_params
    params.require(:wedding).permit(:name, :date, :location, :info_url)
  end
end
