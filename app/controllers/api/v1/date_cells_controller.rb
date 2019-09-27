class Api::V1::DateCellsController < ApplicationController
  before_action :load_date_cell, only: [:update, :show]

  def index
    visible_range = date_range(Date.current)
    render json: {
      visible_range: { start: visible_range.first, end: visible_range.last },
      dates: DateCell.date_in_month(visible_range).map(&:to_json)
    }
  end

  def update
    @date_cell.assign_attributes(date_cell_params)
    if @date_cell.valid?
      @date_cell.save
      render json: { date_cell: @date_cell.include_events }
    else
      render json: :internal_server_error
    end
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

  def date_cell_params
    params.require(:date_cell)
      .permit(:date_cell,
        events_attributes: [:id, :title, :price, :cost_type, :_destroy,
          memo_details_attributes: [:id, :content, :price, :payer_id, :_destroy]])
  end
end
