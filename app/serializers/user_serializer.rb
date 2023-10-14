class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email_address, :age, :password_digest, :received_invitations, :conversations, :joined_groups

  # has_many :joined_groups

  def conversations
    if instance_options[:include_conversations] == false
      nil
    else
      Conversation.where('user1_id = ? OR user2_id = ?', object.id, object.id).map do |conversation|
        ConversationSerializer.new(conversation).as_json
      end
    end
  end

  # def joined_groups
  #   object.joined_groups.includes(:users).map do |group|
  #     group.as_json.merge(users: group.users)
  #   end
  # end
end
