class Group < ApplicationRecord
    belongs_to :admin, class_name: 'User', foreign_key: 'admin_id'
    has_many :group_members
    has_many :users, through: :group_members
    has_many :group_widgets
    has_many :widgets, through: :group_widgets
    has_many :tasks
end
