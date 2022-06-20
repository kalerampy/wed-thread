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

  def wedding_guests
    guests = Wedding.find(params[:id]).users.where.not(id: current_user.id)
    render json: guests, status: :ok
  end

  def wedding_info
    wedding = Wedding.find(params[:id])
    render json: wedding, status: :ok
  end

  def create
    wedding = Wedding.create!(wedding_params)
    wedding.unique_id = Faker::Internet.uuid
    wedding.save
    wedding.permissions.create!(user_id: current_user.id, access: "host")
    render json: wedding, status: :created
  end

  private

  def wedding_params
    params.require(:wedding).permit(:name, :date, :location, :info_url)
  end
end
