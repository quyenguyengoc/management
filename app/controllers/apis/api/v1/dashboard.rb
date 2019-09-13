class APIS::API::V1::Dashboard < Grape::API

  helpers do
    def date_range(date)
      start_at = date.change(day: 10)
      range_start_at = date < start_at ? start_at.change(month: start_at.month - 1) : start_at
      range_end_at = start_at.change({ month: start_at.month + 1, day: 9 })
      [*range_start_at..range_end_at]
    end
  end

  get :dashboard do
    data = DateCell.includes(events: :memo_details).date_in_month(date_range(Date.current))
    present data, with: APIS::Entity::V1::DateCells
  end
end
