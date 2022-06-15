class InvitesController < ApplicationController

  def unique_get
    wedding = Wedding.find_by(unique_id: params[:id])
    render json: wedding, status: :ok
  end

  def invite_post
    atendee = Permission.create!(invite_params)
    atendee.access = "attendee"
    atendee.save
    render json: {message: "You have accepted the invitation"}, status: :ok
  end

  private

  def invite_params
    params.require(:invite).permit(:wedding_id, :user_id)
  end
end
