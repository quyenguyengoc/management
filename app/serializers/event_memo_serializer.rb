class EventMemoSerializer
  include FastJsonapi::ObjectSerializer

  attributes :content, :price
end
