class CreateInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :invitations do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :recipient, null: false, foreign_key: { to_table: :users }
      t.text :message
      t.string :invitation_status
      t.string :invitation_code
      t.datetime :expires_at
      t.timestamps
    end
    add_index :invitations, :invitation_code, unique: true
  end
end
