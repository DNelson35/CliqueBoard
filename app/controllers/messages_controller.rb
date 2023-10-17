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

    def create
        chat = Conversation.find(params[:id])

        message = @current_user.messages.create(body: params[:body], conversation_id: chat.id)
        ActionCable.server.broadcast("ConversationChannel_#{chat.id}", message)
        
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

