class JoinedUserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end

  def unsubscribed; end
end
