class GroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :description, :users, :widgets

  has_one :conversation

  def widgets
    object.widgets.each_with_object({}) do |widget, hash|
      hash[widget.name] = ActiveModel::SerializableResource.new(widget.widget_data.where(group_id: object.id)).as_json
    end
  end
end
