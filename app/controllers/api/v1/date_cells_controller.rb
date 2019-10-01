class Api::V1::DateCellsController < ApplicationController
  before_action :load_month_info, :load_date_cells, only: :index
  before_action :load_date_cell, only: [:update, :show]

  def index
    render json: {
      month_info: @month_info.to_json,
      visible_range: { start: @month_info.start_at, end: @month_info.end_at },
      dates: @date_cells
    }
  end

  def update
    @date_cell.assign_attributes(date_cell_params)
    if @date_cell.valid?
      @date_cell.save
      render json: { date_cell: @date_cell.include_events, month_info: @date_cell.month_info.to_json }
    else
      render json: :internal_server_error
    end
  end

  def show
    render json: { date_cell: @date_cell.include_events }
  end

  private

  def load_month_info
    current = Date.current
    start_at = current.day > 9 ? current.change(day: 10) : current.change(day: 10, month: current.month - 1)
    end_at = start_at.change(month: start_at.month + 1, day: 9)
    @month_info = MonthInfo.includes(dates: [events: :memo_details]).find_by(start_at: start_at)
  end

  def load_date_cells
    @date_cells = @month_info.dates.map(&:to_json)
  end

  def load_date_cell
    @date_cell = DateCell.includes(events: :memo_details).find_by(id: params[:id])
  end
  def date_cell_params
    params.require(:date_cell)
      .permit(:date_cell,
        events_attributes: [:id, :title, :price, :expense_type, :_destroy,
          memo_details_attributes: [:id, :content, :price, :payer_id, :_destroy]])
  end
end
