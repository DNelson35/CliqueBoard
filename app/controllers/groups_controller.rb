require 'securerandom'
class GroupsController < ApplicationController
# TODO: add functionality to remove members from the group

    def create 
        calendar = Widget.find_by(name: 'Calendar')
        current_date = Date.current
        formatted_date = current_date.strftime("%Y-%m-%d")

        code = generate_access_code
        group = @current_user.groups.create!(group_params.merge(access_code: code))

        group.group_members.create!(user_id: @current_user.id, group_id: group.id)
        Conversation.create!(user1_id: @current_user.id, group_id: group.id, chat_type: 'Group')
        group.widget_data.create!(widget_id: calendar.id, start_date: "#{formatted_date}", title: "created #{group.group_name}", event_group: group.group_name )

        render json: group, status: :created
    end

    def index
        group = @current_user.joined_groups
        render json: group, status: :ok
    end

    def show
        group = @current_user.joined_groups.find(params[:id])
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
            users = group.users
            render json: group, status: :created
            data = {
                group: group,
                user: @current_user
            }
            users.each do |user|
                JoinedUserChannel.broadcast_to(user, data) 
            end  
        else
            render json: {error: "invalid access code"}, status: :unauthorized
        end
    end


    private

    def group_params
        params.require(:group).permit(:group_name, :description)
    end

    def generate_access_code
        access_code = SecureRandom.alphanumeric(5)
    end
end
