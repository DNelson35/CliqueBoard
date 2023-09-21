class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users, status: :ok
    end
    
    def create 
        user = User.create!(user_params.merge(status: 'Online'))
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user
    end

    private

    def user_params
        params.permit(:id, :username, :name, :email_address, :age, :img, :password, :password_confirmation)
    end
end
