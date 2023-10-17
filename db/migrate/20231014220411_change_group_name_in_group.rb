class ChangeGroupNameInGroup < ActiveRecord::Migration[7.0]
  def change
    rename_column :groups, :name, :group_name
  end
end
