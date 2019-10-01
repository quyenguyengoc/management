class CreateMonthInfo < ActiveRecord::Migration[5.2]
  def change
    create_table :month_infos do |t|
      t.date :start_at, unique: true, null: false
      t.date :end_at, unique: true, null: false
      t.integer :power_number_start, null: false
      t.integer :power_number_end, default: 0
      t.decimal :total_budget, null: false
    end
  end
end
