class Widget < ApplicationRecord
    has_many :widget_data
    has_many :groups, through: :widget_data         
end
