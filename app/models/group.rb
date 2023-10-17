class Group < ApplicationRecord
    belongs_to :admin, class_name: 'User', foreign_key: 'admin_id'
    has_many :group_members
    has_many :users, through: :group_members
    has_many :widget_data
    has_many :widgets, through: :widget_data
    has_many :tasks
    has_many :conversations
end
