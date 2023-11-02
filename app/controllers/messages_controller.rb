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

    def update
        chat = Conversation.find(params[:chat_id])
        message = Message.find(params[:id])

        message.update(body: params[:body])

        if chat.chat_type == 'User'
            recipient = get_recipient(chat)
            ConversationChannel.broadcast_to(recipient, { message: message, chat_id: chat.id, action: 'Update' })
            ConversationChannel.broadcast_to(@current_user, { message: message, chat_id: chat.id, action: 'Update'})
        else
            group_id = chat.group_id
            group = Group.find(group_id)

            group.users.each do |user|
                ConversationChannel.broadcast_to(user, { message: message, chat_id: chat.id, action: 'Update'}) 
            end
        end  
    end

    def destroy
        message = Message.find(params[:id])
        chat = Conversation.find(message.conversation_id)

        if chat.chat_type == 'User'
            recipient = get_recipient(chat)
            ConversationChannel.broadcast_to(recipient, { message_id: message.id, chat_id: chat.id, action: 'Delete' })
            ConversationChannel.broadcast_to(@current_user, { message_id: message.id, chat_id: chat.id, action: 'Delete'})
        else
            group_id = chat.group_id
            group = Group.find(group_id)
            group.users.each do |user|
                ConversationChannel.broadcast_to(user, { message_id: message.id, chat_id: chat.id, action: 'Delete'})
            end
        end 
        message.destroy   
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

