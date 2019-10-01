import { LocalDataSource } from 'ng2-smart-table';
import { EventDate } from './event-date';
import { EventMemo } from './event-memo';

export class DateCell {
  id: number;
  date: string;
  expense: {
    eating: number;
    other: number;
    all_day: number;
  } = {
    eating: 0,
    other: 0,
    all_day: 0
  };
  events: LocalDataSource = new LocalDataSource([]);

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  async get_events() {
    return await this.events.getAll();
  }

  update_expense(data: any) {
    this.expense.eating = data.expense.eating;
    this.expense.other = data.expense.other;
    this.expense.all_day = data.expense.all_day;
  }

  load_events(events: EventDate[]) {
    this.events = new LocalDataSource(events.map((event: any) => {
      return new EventDate({
        id: event.id,
        title: event.title,
        price: event.price,
        expense_type: event.expense_type === 'eating' ? '0' : '1',
        memo: event.memo.map((memo: any) => {
          return new EventMemo({
            id: memo.id,
            content: memo.content,
            price: memo.price,
            payer_id: memo.payer_id
          })
        })
      })
    }));
  }
}
