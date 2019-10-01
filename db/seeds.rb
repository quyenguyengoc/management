current = Date.current
start_at = current.day > 9 ? current.change(day: 10) : current.change(day: 10, month: current.month - 1)
end_at = start_at.change(month: start_at.month + 1, day: 9)

month_info = MonthInfo.find_or_initialize_by(start_at: start_at, end_at: end_at)

unless month_info.id
  month_info.total_budget = 6000000
  month_info.power_number_start = 305
  month_info.save
end

[*start_at...end_at].each do |date|
  date_cell = month_info.dates.create!(date_cell: date)
end
