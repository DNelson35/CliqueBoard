class WidgetDataController < ApplicationController
    
    def create 
        widget = Widget.find_by_name(params[:name])
        group = @current_user.groups.find(parmas[:id])
        group.widget_data.create!(widget_id: widget, data_key: params[:data_key], data_value: params[:data_value])

    end

    private

    def data_params
        params.permit(:id, :name, :data_key, :data_value)
    end
end
