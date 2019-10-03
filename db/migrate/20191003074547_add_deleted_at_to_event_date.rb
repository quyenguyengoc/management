class AddDeletedAtToEventDate < ActiveRecord::Migration[5.2]
  def change
    add_column :event_dates, :deleted_at, :datetime
    add_index :event_dates, :deleted_at
  end
end
