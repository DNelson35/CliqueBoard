class WidgetDatumSerializer < ActiveModel::Serializer
  attributes :id, :group_id, :widget_id, :created_at, :updated_at, :data_key, :data_value, :widget_name

  def widget_name
    object.widget.name
  end
end
