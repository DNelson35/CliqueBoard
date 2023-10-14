class OnlineUsersChannel < ApplicationCable::Channel
    def subscribed
      stream_for current_user
      update_user_list
    end

    def unsubscribed; end

    def update_user_list 
      logged_in_users = User.joins(:joined_groups).where(status: 'Online').distinct

      logged_in_users.each do |user|
        OnlineUsersChannel.broadcast_to(user, users: logged_in_users)
      end
    end

  end
  