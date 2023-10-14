class ConversationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "Converation#{params[:id]}"
  end

  def unsubscribed end
end
