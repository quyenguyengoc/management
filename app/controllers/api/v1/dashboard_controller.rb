class Api::V1::DashboardController < ApplicationController

  def index
    visible_range = date_range(Date.current)
    date_cells = DateCell.includes(events: :memo_details).date_in_month(visible_range)
    render json: {
      visible_range: { start: visible_range.first, end: visible_range.last },
      dates: DateCellSerializer.new(date_cells).serializable_hash
    }
  end

  private

  def date_range(date)
    start_at = date.change(day: 10)
    range_start_at = date < start_at ? start_at.change(month: start_at.month - 1) : start_at
    range_end_at = start_at.change({ month: start_at.month + 1, day: 9 })
    [*range_start_at..range_end_at]
  end
end
