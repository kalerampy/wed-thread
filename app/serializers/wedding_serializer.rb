class WeddingSerializer < ActiveModel::Serializer

  attributes :id, :name, :info_url, :date, :location, :unique_id, :user_permission

  def user_permission
    if current_user 
      object.permissions.where(user_id: current_user.id).first
    else
      nil
    end
  end

end
