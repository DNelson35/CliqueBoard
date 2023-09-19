class CreateGroupMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :group_members do |t|
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
      t.timestamps
    end
    add_index :group_members, [:user_id, :group_id], unique: true
  end
end
