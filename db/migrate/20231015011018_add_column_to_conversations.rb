class AddColumnToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :chat_type, :string
  end
end
