class CreateHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :histories do |t|
      t.text :content
      t.integer :historyable_id
      t.string :historyable_type

      t.timestamps
    end

    add_index :histories, [:historyable_id, :historyable_type]
  end
end
