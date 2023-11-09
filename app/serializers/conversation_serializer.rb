class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title1, :title2, :chat_type, :deleted_by, :messages
  has_many :messages

end
