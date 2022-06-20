class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher


  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable,
  :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :messages
  has_many :permissions
  has_many :weddings, through: :permissions

  validates :first_name, presence: true
  validates :last_name, presence: true

end