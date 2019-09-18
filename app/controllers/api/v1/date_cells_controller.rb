class Api::V1::DateCellsController < ApplicationController
  before_action :load_date_cell, only: [:create, :show]

  def index
    visible_range = date_range(Date.current)
    render json: {
      visible_range: { start: visible_range.first, end: visible_range.last },
      dates: DateCell.date_in_month(visible_range).map(&:to_json)
    }
  end

  def show
    render json: { date_cell: @date_cell.include_events }
  end
  private

  def date_range(date)
    start_at = date.change(day: 10)
    range_start_at = date < start_at ? start_at.change(month: start_at.month - 1) : start_at
    range_end_at = start_at.change({ month: start_at.month + 1, day: 9 })
    [*range_start_at..range_end_at]
  end

  def load_date_cell
    @date_cell = DateCell.includes(events: :memo_details).find_by(id: params[:id])
  end
end
