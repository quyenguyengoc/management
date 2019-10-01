class Api::V1::MonthInfosController < ApplicationController
  before_action :load_month_info, only: :update

  def update
    @month_info.assign_attributes(month_info_params)
    render json: {
      month_info: @month_info.to_json
    } if @month_info.save
  end

  private

  def load_month_info
    @month_info = MonthInfo.find_by(id: params[:id])
  end

  def month_info_params
    params.require(:month_info).permit(:power_number_start, :power_number_end)
  end
end
