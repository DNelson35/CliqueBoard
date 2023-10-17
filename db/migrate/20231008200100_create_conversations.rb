class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.references :user1, foreign_key: {to_table: :users}
      t.references :user2, foreign_key: {to_table: :users}, null: true
      t.timestamps
    end
  end
end
