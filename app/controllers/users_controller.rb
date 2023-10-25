class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users, include_conversations: false, status: :ok
    end
    
    def create 
        user = User.create!(user_params.merge(status: 'Online'))
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, include_conversations: true
    end

    def searchable_users
        groups = @current_user.joined_groups
        users = groups.flat_map { |group| group.users}
        unique_users = users.uniq

        render json: unique_users, status: :ok
    end

    private

    def user_params
        params.permit(:id, :username, :name, :email_address, :age, :password, :password_confirmation)
    end
end
