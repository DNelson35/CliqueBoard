class Conversation < ApplicationRecord
    belongs_to :user1, class_name: 'User'
    belongs_to :user2, class_name: 'User', optional: true
    belongs_to :group, optional: true
    has_many :messages

    def title1
        user1.username || group.group_name
    end

    def title2
        if user2.nil?
            group.group_name
        else
            user2.username
        end
    end
end
