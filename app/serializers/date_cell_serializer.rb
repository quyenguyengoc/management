class DateCellSerializer
  include FastJsonapi::ObjectSerializer

  attributes :eating_cost, :other_cost

  attribute :date do |item|
    item.date_cell
  end

  attribute :events do |item|
    item.events.map do |event|
      EventDateSerializer.new(event).serializable_hash
    end
  end
end
