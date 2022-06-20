class WeddingSerializer < ActiveModel::Serializer

  attributes :id, :name, :info_url, :date, :location, :unique_id, :user_permission

  def user_permission
    object.permissions.where(user_id: current_user.id).first
  end

end
