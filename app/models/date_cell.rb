class DateCell < ApplicationRecord

  has_many :events, foreign_key: :date_cell_id, class_name: 'EventDate', dependent: :destroy

  has_many :memos, through: :events

  def eating_cost
    events.eating.sum(&:price)
  end

  def other_cost
    events.other.sum(&:price)
  end

  class << self
    def date_in_month(date_range)
      where('date_cell IN (?)', date_range)
    end
  end
end
