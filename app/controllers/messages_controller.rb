class MessagesController < ApplicationController

    # def create
    #     chat = find_or_create_conversation
    #     message = @current_user.messages.new(message_params)
    #     message.conversation = chat

    #     if message.save!
    #     ConversationChannel.broadcast_to(chat, message)
    #     puts 'message was successfully'
    #     end

    # end
    # # def create
    # #     @message = Message.create(message_params)
    # #     @conversation = Conversation.find(@message[:conversation_id])
    # #     ConversationChannel.broadcast_to(@conversation, @message)
    # #     render json: @message
    # # end

    # i could try sending this like i send the whole conversation then i should be able to recieve the message without the need for the chat id and i should be able to receive the message from anywhere maybe

    # the idea being i could then keep this at a higer level if it dosnt work where it is so that i can just set state for the chat and find the conversation by the chat then push the message to that conversation.
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

    # def find_or_create_conversation
    #     chat = if params[:chat_type] == "User"
    #              @current_user.all_conversations.find_by(chat_type: params[:chat_type], user1_id: @current_user.id, user2_id: params[:recipient_id])
    #            else
    #              @current_user.all_conversations.find_by(chat_type: params[:chat_type], group_id: params[:recipient_id])
    #            end
      
    #     unless chat
    #       chat = @current_user.conversations.create(chat_type: params[:chat_type], user1_id: @current_user.id, user2_id: params[:chat_type] == "User" ? params[:recipient_id] : nil, group_id: params[:chat_type] == "Group" ? params[:recipient_id] : nil)
    #     end
      
    #     chat
    #   end


end

