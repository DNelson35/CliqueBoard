class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.references :admin, foreign_key: {to_table: :users}
      t.string :name
      t.string :description
      t.string :access_code

      t.timestamps
    end
  end
end
