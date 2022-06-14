class Message < ApplicationRecord
  include ActiveModel::Serialization
  belongs_to :message_thread
  belongs_to :user
end
