class EventDate < ApplicationRecord

  belongs_to :date_cell
  has_many :memo_details, foreign_key: :event_date_id, class_name: 'EventMemo', dependent: :destroy

  accepts_nested_attributes_for :memo_details, allow_destroy: true

  validates :title, :cost_type, presence: true
  validates :price, numericality: true

  enum cost_type: [:eating, :other]

  before_save :set_price

  def set_price
    self.price = memo_details.sum(&:price)
  end

  def to_json
    {
      id: id,
      title: title,
      price: price,
      memo: memo_details.map(&:to_json),
      cost_type: cost_type
    }
  end
end
