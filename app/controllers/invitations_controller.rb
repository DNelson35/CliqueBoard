class InvitationsController < ApplicationController
    def create 
        recipient = User.find(params[:recipient_id])
        group = Group.find(params[:group_id])
        message = "#{@current_user.name} wants to invite you to #{group.group_name} group. If you wish to join, please enter the following access key: (#{group.access_code}). "
        invitation = Invitation.create(sender: @current_user, recipient: recipient, message: message)
        InvitationChannel.broadcast_to(recipient, { invitation: invitation })
    end

    def destroy
        invite = @current_user.received_invitations.find(params[:id])
        invite.destroy
        head :no_content
    end

end
