class ConversationChannel < ApplicationCable::Channel
  def subscribed
    # conversation = Conversation.find(params[:id])
    stream_from "ConversationChannel_#{params[:id]}"
  end

  def unsubscribed; end
end
