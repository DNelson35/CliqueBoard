module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      verified_user = User.find(cookies.encrypted['_session_id']['user_id'])
      
      return verified_user unless verified_user.nil?

      reject_unauthorized_connection
    end
  end
end
