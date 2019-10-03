class EventDate < ApplicationRecord
  acts_as_paranoid

  belongs_to :date_cell
  has_many :memo_details, foreign_key: :event_date_id, class_name: 'EventMemo', dependent: :destroy
  has_many :histories, as: :historyable

  accepts_nested_attributes_for :memo_details, allow_destroy: true

  validates :title, :expense_type, presence: true
  validates :price, numericality: true

  enum expense_type: [:eating, :other]

  before_save :set_price
  before_update :create_log
  after_save :create_log

  def set_price
    self.price = memo_details.sum(&:price)
  end

  def to_json
    {
      id: id,
      title: title,
      price: price,
      memo: memo_details.map(&:to_json),
      expense_type: expense_type
    }
  end

  def create_log
    return if self.histories.find_by(historyable: self.id) && !self.changed?
    if self.changed?
      content = "update event: "
      content << "#{self.title_was} => #{self.title}" if self.title_changed?
      content << "#{self.expense_type_was} => #{self.expense_type}" if self.expense_type_changed?
    else
      content = "create event: #{self.title} with type #{self.expense_type}"
    end
    self.histories.create(content: content)
  end
end
