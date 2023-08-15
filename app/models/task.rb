class Task < ApplicationRecord
    belongs_to :group
    belongs_to :widget
    belongs_to :group_member
end
