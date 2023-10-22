class WidgetDatumSerializer < ActiveModel::Serializer
  attributes :id, :group_id, :widget_id, :created_at, :updated_at, :data_key, :data_value, :title, :event_group, :description, :start_date, :end_date

end
