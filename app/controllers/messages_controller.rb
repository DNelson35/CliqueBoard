class MessagesController < ApplicationController

    def create
        recipient_id = params[:recipient_id].to_i
        current_user_id = @current_user.id
        # chat = Conversation.find_by(user1_id: [@current_user.id, params[:recipient_id]], user2_id: [params[:recipient_id], @current_user])
        chat = Conversation.where("(user1_id = :current_user AND user2_id = :recipient) OR (user1_id = :recipient AND user2_id = :current_user)", current_user: current_user_id, recipient: recipient_id).first

        unless chat
            chat = Conversation.create(user1_id: @current_user.id, user2_id: params[:recipient_id])
        end

        message = @current_user.messages.new(message_params)
        message.conversation = chat

        if message.save!
        # ConversationChannel.broadcast_to(chat, message)
        puts 'message was successfully'
        end

    end
    

    private

    def message_params
        params.require(:message).permit(:body)
    end


end

