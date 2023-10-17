class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title1, :title2, :chat_type
  has_many :messages

  # possible fix for titles is having the channel send the title down witht the conversation since the channel can gain access tot the current user.

end
