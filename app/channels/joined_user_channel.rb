class JoinedUserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "JoinedUserChannel_#{params[:group_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
