class ConversationsController < ApplicationController
    def create
        chat = chat_type_conditions

        if chat 
            render json: {errors: 'already exist', chat: chat}, status: :unprocessable_entity
        else
            create_chat
        end
    end

    private

    def chat_type_conditions
        if params[:chat_type] == 'User'
            @current_user.all_conversations.where('user1_id = ? OR user2_id = ?', params[:user2_id], params[:user2_id]).first
        elsif params[:chat_type] == 'Group'
            @current_user.all_conversations.where(group_id: params[:group_id]).first
        end
    end

    def create_chat
        chat = @current_user.started_conversations.create!(chat_params)
        message = @current_user.messages.create!(body: params[:body], conversation_id: chat.id)
        ConversationChannel.broadcast_to(chat, message)
        render json: chat, status: :created
    end

    def chat_params
        params.require(:conversation).permit(:user2_id, :chat_type, :group_id)
    end

    def message_params
        params.require(:messages).permit(:body)
    end
end
