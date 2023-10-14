class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create
    
    def create 
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            user.update!(status: 'Online')
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: 'Invalid Username or Password'}, status: :unauthorized
        end
    end

    def destroy
        @current_user.update!(status: 'Offline')
        session.delete :user_id
        head :no_content
    end

end
