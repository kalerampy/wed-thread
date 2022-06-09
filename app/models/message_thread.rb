class MessageThread < ApplicationRecord
  belongs_to :wedding
  has_many :messages, dependent: :destroy
end
