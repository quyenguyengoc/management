class DateCell < ApplicationRecord
  attr_reader :eating_cost, :other_cost

  has_many :events, foreign_key: :date_cell_id, class_name: 'EventDate', dependent: :destroy

  def eating_cost
    events.eating.sum(&:price)
  end

  def other_cost
    events.other.sum(&:price)
  end
end
