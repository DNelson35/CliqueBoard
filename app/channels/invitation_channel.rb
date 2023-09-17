class InvitationChannel < ActionCable::Channel::Base
    def subscribed
      stream_for current_user
    end
  
    def unsubscribed; end
end
  
    # TODO: set up access_code to be randomly generated based of the groups unique access codes when this access code is generated it will use the group code to make a new encription that encription will be decyripted when the user sends the request to join the group and if the codes match the user will then be added to the group. they will have 48 hours and the code will no longer be valid
