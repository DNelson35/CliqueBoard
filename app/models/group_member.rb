require 'securerandom'
class GroupMember < ApplicationRecord
    belongs_to :user
    belongs_to :group

    # validates :invitation_status, presence: true, inclusion: { in: %w[pending accepted] }
    # validates :invitation_code, presence: true, uniqueness: true
    # validates :expires_at, presence: true

    # before_create :generate_invitation_code

    # private

    # def generate_invitation_code
    #   self.invitation_code = SecureRandom.hex(6)
    # end
end
