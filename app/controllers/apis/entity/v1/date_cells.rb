class APIS::Entity::V1::DateCells < Grape::Entity
  expose :id, :eating_cost, :other_cost

  expose :date do |item|
    item.date_cell
  end

  expose :events do |item|
    item.events.map do |event|
      {
        id: event.id,
        title: event.title,
        price: event.price,
        type: event.cost_type,
        memo: event.memo_details
      }
    end
  end
end
