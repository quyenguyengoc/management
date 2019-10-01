class CreateDateCell < ActiveRecord::Migration[5.2]
  def change
    create_table :date_cells do |t|
      t.date :date_cell, null: false
      t.integer :month_info_id, null: false
    end

  end
end
