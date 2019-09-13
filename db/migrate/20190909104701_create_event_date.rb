class CreateEventDate < ActiveRecord::Migration[5.2]
  def change
    create_table :event_dates do |t|
      t.string :title, null: false
      t.decimal :price, default: 0
      t.integer :cost_type, null: false
      t.integer :date_cell_id, null: false
    end
  end
end
