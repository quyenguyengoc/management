class AddDeletedAtToEventMemo < ActiveRecord::Migration[5.2]
  def change
    add_column :event_memos, :deleted_at, :datetime
    add_index :event_memos, :deleted_at
  end
end
