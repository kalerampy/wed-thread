class MessageThreadsController < ApplicationController
  #before_action :set_api_v1_thread, only: %i[ show update destroy ]
  #before_action :authenticate_user!
  # GET /api/v1/threads
  # def index
  #   threads = MessageThread.all
  #   render json: threads
  # end

  def index 
    threads = MessageThread.all
    render json: threads
  end

  def show
    thread = MessageThread.find(params[:id])
    render json: thread
  end

  def wedding_threads
    wedding_threads = Wedding.find(params[:id]).message_threads
    render json: wedding_threads
  end

  def create
    thread = MessageThread.create(thread_params)
    render json: thread, status: :created
  end

  private
  
  def thread_params
    params.require(:message_thread).permit(:title, :wedding_id)
  end

end
