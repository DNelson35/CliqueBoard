class InvitationsController < ApplicationController

    def create 
        recipient = User.find(params[:recipient_id])
        group = params[:group_name]
        message = "#{@current_user.name} wants to invite you to #{group} group. If you wish to join, please enter the following access key: (placeHolder). This access key will expire in 48 hours. "
        invitation = Invitation.create(sender: @current_user, recipient: recipient, message: message)
        InvitationChannel.broadcast_to(recipient, { invitation: invitation })
    end

    #TODO: set up a index for the current user invitations, do this so i can have a list of all invitations to set the notifications on the front end, also i will need an delete route so invitations can be deleted.

    #TODO: set up the access code to be generated and for it to work.
end
