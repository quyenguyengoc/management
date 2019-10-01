class MonthInfo < ApplicationRecord
  attr_accessor :current_budget

  has_many :dates, class_name: 'DateCell', foreign_key: :month_info_id

  def eating_expense
    dates.sum(&:eating_expense)
  end

  def other_expense
    dates.sum(&:other_expense)
  end

  def power_expense
    return 0 if power_number_end.zero?
    (power_number_end - power_number_start) * Settings.expense.power_number
  end

  def rent_expense
    Settings.expense.rent
  end

  def water_expense
    Settings.expense.water
  end

  def power_info
    {
      start_at: power_number_start,
      end_at: power_number_end,
      expense: power_expense
    }
  end

  def expense_info
    {
      power: power_info,
      eating: eating_expense,
      other: other_expense,
      water: water_expense,
      rent: rent_expense
    }
  end

  def days_count
    end_at.mjd - start_at.mjd
  end

  def budget_info
    {
      total: total_budget,
      per_day: budget_per_day
    }
  end

  def budget_per_day
    (total_budget - other_expense - rent_expense - power_expense) / days_count.to_f
  end

  def to_json
    {
      id: id,
      budget: budget_info,
      start_at: start_at,
      end_at: end_at,
      days: days_count,
      expense: expense_info
    }
  end
end
