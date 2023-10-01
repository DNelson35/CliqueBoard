class RemoveWidgetDataAndModifyGroupWidgets < ActiveRecord::Migration[7.0]
  def change
     drop_table :widget_data

     rename_table :group_widgets, :widget_data

     add_column :widget_data, :data_key, :string
     add_column :widget_data, :data_value, :string
  end
end
