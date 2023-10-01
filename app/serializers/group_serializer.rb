class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :users, :widgets

  def widgets
    object.widgets.each_with_object({}) do |widget, hash|
      hash[widget.name] = widget.widget_data.where(group_id: object.id)
    end
  end
end
