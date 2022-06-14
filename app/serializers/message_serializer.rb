class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :message_thread_id, :username, :user_id
  belongs_to :user

  def username
    "#{object.user.first_name} #{object.user.last_name}"
  end
end
