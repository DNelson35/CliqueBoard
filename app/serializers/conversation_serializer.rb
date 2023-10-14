class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title1, :title2
  has_many :messages

end
