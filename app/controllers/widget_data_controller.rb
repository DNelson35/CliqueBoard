class WidgetDataController < ApplicationController
    
    def create 
        widget = Widget.find_by(name: params[:name])
        group = @current_user.joined_groups.find(params[:group_id])
        event = widget.widget_data.create!(data_params)
        ActionCable.server.broadcast("EventChannel_#{group.id}", event)
    end
    # probably should not add the event group here and just change the table to have have the name of the group sent when creating the event would reduce the load of the backend and shouldnt be to much to do on the frontend
    

    private

    def data_params
        params.permit(:group_id, :data_key, :data_value, :title, :description, :start_date, :end_date, :event_group)
    end
end
