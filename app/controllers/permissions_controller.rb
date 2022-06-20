class PermissionsController < ApplicationController

  def show
    permission = Permission.where(wedding_id: params[:id])
    render json: permission
  end

  def destroy
    permission = Permission.find(params[:id])
    permission.destroy
    render json: {}, status: :ok
  end
end
