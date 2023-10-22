class AddColumnToWidgetData < ActiveRecord::Migration[7.0]
  def change
    add_column :widget_data, :event_group, :string
  end
end
