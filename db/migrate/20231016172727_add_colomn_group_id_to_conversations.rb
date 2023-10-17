class AddColomnGroupIdToConversations < ActiveRecord::Migration[7.0]
  def change
    add_reference :conversations, :group, foreign_key: { to_table: :groups }, null: true
  end
end
