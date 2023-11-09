class AddColumnDeletedByToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :deleted_by, :integer
  end
end
