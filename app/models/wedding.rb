class Wedding < ApplicationRecord

  has_many :permissions, dependent: :destroy
  has_many :users, through: :permissions
  has_many :message_threads, dependent: :destroy
end
