class Permission < ApplicationRecord
  belongs_to :wedding
  belongs_to :user

  validates :wedding_id, presence: true
  validates :user_id, presence: true
  validates :wedding_id, uniqueness: { scope: :user_id }
end
