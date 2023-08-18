class GroupMembersController < ApplicationController
    def accept_invitation
        invitation = Membership.find_by(invitation_code: params[:invitation_code])

        if invitation.nil?
          redirect_to root_path, alert: "Invalid invitation"
        else
          invitation.update(invitation_status: "accepted")
          redirect_to group_path(invitation.group_id), notice: "Invitation accepted successfully"
        end
    end
end
