class CreateWidgetData < ActiveRecord::Migration[7.0]
  def change
    create_table :widget_data do |t|
      t.references :widget
      t.string :data_key
      t.string :data_value

      t.timestamps
    end
  end
end
