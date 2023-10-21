class User < ApplicationRecord
    has_secure_password
    has_many :groups, foreign_key: 'admin_id', dependent: :destroy
    has_many :group_members
    has_many :joined_groups, through: :group_members, source: :group
    has_many :sent_invitations, class_name: 'Invitation', foreign_key: 'sender_id'
    has_many :received_invitations, class_name: 'Invitation', foreign_key: 'recipient_id'
    has_many :messages
    has_many :conversations
    has_many :started_conversations, class_name: 'Conversation', foreign_key: 'user1_id'
    has_many :joined_conversations, class_name: 'Conversation', foreign_key: 'user2_id'
   
    def all_conversations
        started_conversations.or(joined_conversations)
    end
end
