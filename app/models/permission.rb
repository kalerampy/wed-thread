class Permission < ApplicationRecord
  belongs_to :wedding
  belongs_to :user
end
