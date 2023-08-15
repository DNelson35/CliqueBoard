class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      t.references :group_member, foreign_key: true
      t.string :task_description
      t.string :task_status
      t.timestamps
    end
  end
end
