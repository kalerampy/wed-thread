class PermissionsController < ApplicationController

  def show
    permission = Permission.where(wedding_id: params[:id])
    render json: permission
  end

end
