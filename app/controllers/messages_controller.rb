class MessagesController < ApplicationController

    def create
        chat = Conversation.find(params[:id])

        if (chat.chat_type == "User")

            recipient = get_recipient(chat)
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

    def destroy
        message = Message.find(params[:id])
        chat = Conversation.find(message.conversation_id)
        recipient = get_recipient(chat)
        message.destroy
        ConversationChannel.broadcast_to(recipient, { message_id: message.id, chat_id: chat.id, action: 'delete' })
        ConversationChannel.broadcast_to(@current_user, { message_id: message.id, chat_id: chat.id, action: 'delete'})
    end
    
    private

    def message_params
        params.require(:message).permit(:body, :id)
    end

    def get_recipient(chat)
        recipient_id = chat.user1_id == @current_user.id ? chat.user2_id : chat.user1_id
        User.find(recipient_id)
    end
end

