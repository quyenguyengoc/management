class Api::V1::DateCellsController < ApplicationController
  before_action :load_month_info, :load_date_cells, only: :index
  before_action :load_date_cell, only: [:update, :show]

  def index
    puts "OK"
    render json: {
      month_info: @month_info.to_json,
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
    month_info = Date.parse(params[:start_at]) rescue Date.current
    start_at = month_info.day > 10 ? month_info.change(day: 10) : (month_info - 1.month).change(day: 10)
    @month_info = MonthInfo.includes(dates: [events: :memo_details]).find_by(start_at: start_at)
    unless @month_info
      pre_month = MonthInfo.find_by(start_at: (start_at - 1.month))
      end_at = start_at + 1.month
      power_number_start = pre_month.power_number_end rescue 0
      @month_info = MonthInfo.new(start_at: start_at, end_at: end_at, total_budget: Settings.default_total_budget, power_number_start: power_number_start)
      @month_info.save if @month_info.valid?
      [*start_at...end_at].each do |date|
        date_cell = @month_info.dates.create!(date_cell: date)
      end
    end
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
