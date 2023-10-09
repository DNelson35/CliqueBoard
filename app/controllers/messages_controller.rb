class MessagesController < ApplicationController
    recipient_id = params[:recipient_id]
    chat = Conversation.find_by(user1_id: [@current_user.id, recipient_id], user2_id: [@current_user.id, recipient_id])

    unless chat
        chat = Conversation.create!(user1_id: @current_user.id, user2_id: recipient_id)
    end

    message = @current_user.messages.new(message_params)
    message.conversation = chat

    if message.save!
      ConversationChannel.broadcast_to(chat, message)
    end

end

private

def message_params
    params.require(:message).permit(:body)
end
