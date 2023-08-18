require 'securerandom'
class GroupsController < ApplicationController
# TODO: add a channel for a websocket to send the invitation to the user in real time
# TODO: design set up for how a user should recieve the invitation and how they should submit to join the group
# TODO: add functionality to remove members from the group

    def create 
        group = @current_user.create!(group_params)
        render json: group, status: :created
    end

    def invite 
        group = Group.find(params[:id])
        invited_user = User.find_by(username: params[:username])

        if invited_user.nil? || group.users.include?(invited_user)
            render json: { errors: "User not found or already a member" }, status: :unprocessable_entity
        else 
            invitation = group.memberships.create!(user: invited_user, invitation_status: "pending", expires_at: 48.hours.from_now)
            render json: { message: "Invitation sent successfully" }, status: :ok
        end
    end

    private

    def group_params
        params.permit(:name, :description )
    end
end
