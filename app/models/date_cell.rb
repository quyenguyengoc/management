class DateCell < ApplicationRecord

  has_many :events, foreign_key: :date_cell_id, class_name: 'EventDate', dependent: :destroy

  has_many :memo, through: :events, source: :memo_details

  accepts_nested_attributes_for :events, allow_destroy: true

  def eating_cost
    events.eating.sum(&:price)
  end

  def other_cost
    events.other.sum(&:price)
  end

  def to_json
    {
      id: id,
      date: date_cell,
      events: events.map(&:to_json),
      eating_cost: eating_cost,
      other_cost: other_cost
    }
  end

  def include_events
    to_json.merge({ events: events.map(&:to_json) })
  end

  class << self
    def date_in_month(date_range)
      where('date_cell IN (?)', date_range)
    end
  end
end
