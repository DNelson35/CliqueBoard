require 'securerandom'
class GroupsController < ApplicationController

# TODO: add functionality to remove members from the group

    def create 
        code = generate_access_code
        group = @current_user.groups.create!(group_params.merge(access_code: code))
        group.group_members.create!(user_id: @current_user.id, group_id: group.id)
        render json: group, status: :created
    end

    def index
        group = @current_user.joined_groups
        render json: group, status: :ok
    end

    def destroy
        group = @current_user.groups.find(params[:id])
        group.destroy
        head :no_content
    end

    def join
        group = Group.find_by(access_code: params[:access_code])
        if group
            member = group.group_members.create!(user_id: @current_user.id)
            render json: group, status: :created
        else
            render json: {error: "invalid access code"}, status: :unauthorized
        end
    end

      


    # TODO: expample of how to implement the invitation invite with the experation. this has been moved to the invitation controller logic for the experation still needs to be implemented

    # def invite 
    #     group = Group.find(params[:id])
    #     invited_user = User.find_by(username: params[:username])

    #     if invited_user.nil? || group.users.include?(invited_user)
    #         render json: { errors: "User not found or already a member" }, status: :unprocessable_entity
    #     else 
    #         invitation = group.memberships.create!(user: invited_user, invitation_status: "pending", expires_at: 48.hours.from_now)
    #         render json: { message: "Invitation sent successfully" }, status: :ok
    #     end
    # end

    private

    def group_params
        params.require(:group).permit(:name, :description)
    end

    def generate_access_code
        access_code = SecureRandom.alphanumeric(5)
    end
end
