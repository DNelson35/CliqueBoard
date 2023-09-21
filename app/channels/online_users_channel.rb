class OnlineUsersChannel < ApplicationCable::Channel
    def subscribed
      stream_for current_user
      update_user_list
    end

    def unsubscribed; end
  
    def update_user_list 
        logged_in_users = User.joins(:joined_groups).where(groups: { id: current_user.groups }).where(status: 'Online').distinct
        OnlineUsersChannel.broadcast_to(current_user, users: logged_in_users)
    end
  end
  