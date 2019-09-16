class EventDateSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :price, :cost_type

  attribute :memo do |item|
    item.memo_details.map do |memo_detail|
      EventMemoSerializer.new(memo_detail).serializable_hash
    end
  end
end
