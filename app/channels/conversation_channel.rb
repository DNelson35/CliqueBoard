class ConversationChannel < ActionCable::Channel::Base
  def subscribed
    stream_for current_user
  end

  def unsubscribed; end
end
