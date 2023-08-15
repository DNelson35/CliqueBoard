class CreateGroupWidgets < ActiveRecord::Migration[7.0]
  def change
    create_table :group_widgets do |t|
      t.references :group, foreign_key: true
      t.references :widget, foreign_key: true
      t.timestamps
    end
  end
end
