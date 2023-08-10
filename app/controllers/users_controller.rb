class UsersController < ApplicationController
    before_action :authorize, only: :show

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user
    end


    private

    def user_params
        params.permit(:username, :name, :email_address, :age, :password, :password_confirmation)
    end
end
