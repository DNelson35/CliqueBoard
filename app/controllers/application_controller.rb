class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    before_action :authorize

    private

    def authorize 
        @current_user = User.find_by(id: session[:user_id])

        render json: {errors: ["Not Authorized"]}, status: :unauthorized unless session.include?(:user_id)
    end

    def render_invalid(e)
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end
    
    def render_not_found
        render json: {errors: 'Not Found'}, status: :not_found
    end
end
