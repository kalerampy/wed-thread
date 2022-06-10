class MessageThreadChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_thread_channel"
    MessageThreadChannel.all_messages(Message.all.order(id: :body).limit(25))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def send_text(data)
    Message.create(body: data['message'], user_id: data['user_id'], message_thread_id: data['message_thread_id'])

    ActionCable.server.broadcast('message_thread_channel',
      message: data['message'],
      user_id: data['user_id'],
      message_thread_id: data['message_thread_id']
  )
  end

  def self.all_message(messages)
    ActionCable.server.broadcast('chat_messages_channel', history: messages)
  end


end