# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

DateCell.all.each do |date_cell|
  [*1...5].sample.times do |i|
    event_date = date_cell.events.new( { title: Faker::Book.title, cost_type: [:eating, :other].sample } )
    memo_details = []
    [*1..3].sample.times do |index|
      memo_details << {
        content: Faker::Lorem.sentence,
        price: [*1..50].sample * 10000,
        event: event_date
      }
    end
    event_date.memo_details = EventMemo.create(memo_details)
    event_date.save
  end
end
