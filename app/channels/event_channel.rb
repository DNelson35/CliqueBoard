class EventChannel <  ApplicationCable::Channel
  def subscribed
    stream_from "EventChannel_#{params[:group_id]}"
  end

  def unsubscribed; end
end
