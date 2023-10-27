class ConversationChannel < ActionCable::Channel::Base
  def subscribed
    # conversation = Conversation.find(params[:id])
    stream_for current_user
  end

  def unsubscribed; end
end
