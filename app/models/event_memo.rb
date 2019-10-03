class EventMemo < ApplicationRecord
  acts_as_paranoid

  belongs_to :event, foreign_key: :event_date_id, class_name: 'EventDate', optional: true
  has_many :histories, as: :historyable

  validates :content, presence: true
  validates :price, numericality: true

  before_update :create_log
  after_save :create_log

  def to_json
    {
      id: id,
      content: content,
      price: price,
      payer_id: payer_id
    }
  end

  def create_log
    return if self.histories.find_by(historyable: self.id) && !self.changed?
    if self.changed?
      content = "update memo: "
      content << "#{self.content_was} => #{self.content}" if self.content_changed?
      content << "#{self.price_was} => #{self.price}" if self.price_changed?
      content << "#{self.payer_id_was} => #{self.payer_id}" if self.payer_id_changed?
    else
      content = "create memo: #{self.content} with price #{self.price}"
    end
    self.histories.create(content: content)
  end
end
