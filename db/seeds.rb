date = Date.current
start_at = date.change(day: 10)
range_start_at = date < start_at ? start_at.change(month: start_at.month - 1) : start_at
range_end_at = start_at.change({ month: start_at.month + 1, day: 9 })


DateCell.date_in_month([*range_start_at..range_end_at]).each do |date_cell|
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
