class CreateDateCell < ActiveRecord::Migration[5.2]
  def change
    create_table :date_cells do |t|
      t.date :date_cell, null: false
    end

    DateCell.create([*Date.current.beginning_of_month..Date.current.end_of_month].map{ |date| { date_cell: date} })
  end
end
