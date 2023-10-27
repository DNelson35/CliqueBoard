class ConversationsController < ApplicationController
    def index
       user_conversations = @current_user.all_conversations.where(chat_type: 'User')
        group_conversations = @current_user.joined_groups.map do |group|
            group.conversation
        end

        conversations = user_conversations + group_conversations 

        render json: conversations, include: [:messages], status: :ok
    end

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
        @current_user.all_conversations.where('user1_id = ? OR user2_id = ?', params[:user2_id], params[:user2_id]).first
    end

    def create_chat
        recipient = User.find(params[:user2_id])
        chat = @current_user.started_conversations.create!(chat_params)
        message = @current_user.messages.create!(body: params[:body], conversation_id: chat.id)

        chat = {
            id: chat.id,
            title1: chat.title1,
            title2: chat.title2,
            chat_type: chat.chat_type,
            messages: [
              message
            ]
          }

        MessengerChannel.broadcast_to(recipient, chat: chat)

        render json: chat, status: :created
    end

    def chat_params
        params.require(:conversation).permit(:user2_id, :chat_type, :group_id)
    end

    def message_params
        params.require(:messages).permit(:body)
    end
end
