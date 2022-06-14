class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages"
    message = MessageThread.find(params[:id]).serializable_hash(include: {messages: {include: :user}})

    ActionCable.server.broadcast("messages", message)

    # message = Message.where(message_thread_id: params[:id])
    # stream_for message
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
