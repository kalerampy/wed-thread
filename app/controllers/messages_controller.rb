class MessagesController < ApplicationController

  def create
    message = Message.create!(message_params)
    render json: message
  end

  # def show
  #   message = Message.where(message_thread_id: params[:id])
  #   render json: message, each_serializer: MessageSerializer
  # end

  def index
    render json: Message.all
  end

  private

  def message_params
    params.permit(:body, :user_id, :message_thread_id)
  end

end
