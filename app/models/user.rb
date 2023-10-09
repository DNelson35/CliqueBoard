class User < ApplicationRecord
    has_secure_password
    has_many :groups, foreign_key: 'admin_id', dependent: :destroy
    has_many :group_members
    has_many :joined_groups, through: :group_members, source: :group
    has_many :sent_invitations, class_name: 'Invitation', foreign_key: 'sender_id'
    has_many :received_invitations, class_name: 'Invitation', foreign_key: 'recipient_id'
    has_many :messages
    has_many :conversations
    #  the joined_groups can be changed to a regular has many through this is speciffcly for naming the association to joined_groups instead
end
