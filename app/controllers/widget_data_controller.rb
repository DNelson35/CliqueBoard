class WidgetDataController < ApplicationController
    
    def create 
        widget = Widget.find_by(name: params[:name])
        group = @current_user.joined_groups.find(params[:group_id])
        event = widget.widget_data.create!(data_params)
        users = group.users

        group.users.each do |user|
            EventChannel.broadcast_to(user, event)
        end
        # ActionCable.server.broadcast("EventChannel_#{group.id}", event)
    end
   
    private

    def data_params
        params.permit(:group_id, :data_key, :data_value, :title, :description, :start_date, :end_date, :event_group)
    end
end
