class Widget < ApplicationRecord
    has_many :group_widgets
    has_many :users, through: :group_widgets
    has_many :widget_data
end
