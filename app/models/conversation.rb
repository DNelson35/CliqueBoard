class Conversation < ApplicationRecord
    belongs_to :user1, class_name: 'User'
    belongs_to :user2, class_name: 'User', optional: true
    belongs_to :group, optional: true
    has_many :messages, dependent: :destroy


    def title1
        user1.username.upcase_first || group.group_name.upcase_first
    end

    def title2
        if user2.nil?
            group.group_name.upcase_first
        else
            user2.username.upcase_first
        end
    end

end
