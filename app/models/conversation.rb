class Conversation < ApplicationRecord
    belongs_to :user1, class_name: 'User'
    belongs_to :user2, class_name: 'User'
    has_many :messages

    def title1
        user1.username
    end

    def title2
        user2.username
    end
end
