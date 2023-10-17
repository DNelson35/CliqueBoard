class ConversationsController < ApplicationController
    def create
        chat = @current_user.started_conversations.create!(chat_params)
        message = @current_user.messages.create!(body: params[:body], conversation_id: chat.id)
        ConversationChannel.broadcast_to(chat, message)
    end

    private

    def chat_params
        params.require(:conversation).permit(:user2_id, :chat_type, :group_id)
    end

    def message_params
        params.require(:messages).permit(:body)
    end
end
