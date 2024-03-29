class CreateEventMemo < ActiveRecord::Migration[5.2]
  def change
    create_table :event_memos do |t|
      t.string :content, null: false
      t.decimal :price, default: 0
      t.integer :event_date_id
      t.integer :payer_id, default: 0
    end
  end
end
