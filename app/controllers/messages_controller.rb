class MessagesController < ApplicationController

    def create
        chat = Conversation.find(params[:id])

        if (chat.chat_type == "User")
            recipient_id = chat.user1_id == @current_user.id ? chat.user2_id : chat.user1_id

            recipient = User.find(recipient_id)

            message = @current_user.messages.create(body: params[:body], conversation_id: chat.id)

            ConversationChannel.broadcast_to(recipient, message)
            ConversationChannel.broadcast_to(@current_user, message)
        else
            group_id = chat.group_id
            group = Group.find(group_id)

            message = @current_user.messages.create(body: params[:body], conversation_id: chat.id)

            group.users.each do |user|
                ConversationChannel.broadcast_to(user, message)
            end
            
        end
        
    end
    
    private

    def message_params
        params.require(:message).permit(:body, :id)
    end
end

