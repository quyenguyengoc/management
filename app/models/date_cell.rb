class DateCell < ApplicationRecord

  has_many :events, foreign_key: :date_cell_id, class_name: 'EventDate', dependent: :destroy

  has_many :memo, through: :events, source: :memo_details

  belongs_to :month_info, foreign_key: :month_info_id

  accepts_nested_attributes_for :events, allow_destroy: true

  def eating_expense
    events.eating.sum(&:price)
  end

  def other_expense
    events.other.sum(&:price)
  end

  def day_expense
    events.sum(&:price)
  end

  def expense
    eating = eating_expense
    other = other_expense

    {
      eating: eating,
      other: other,
      all_day: eating + other
    }
  end

  def to_json
    {
      id: id,
      date: date_cell,
      events: events.map(&:to_json),
      expense: expense
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
