class User < ApplicationRecord
    has_secure_password
    has_many :groups, foreign_key: 'admin_id', dependent: :destroy
    has_many :joined_groups, through: :group_members, source: :group
    #  the joined_groups can be changed to a regular has many through this is speciffcly for naming the association to joined_groups instead
end
