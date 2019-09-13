class EventMemo < ApplicationRecord

  belongs_to :event, foreign_key: :event_date_id, class_name: 'EventDate'

  validates :content, presence: true
  validates :price, numericality: true
end
