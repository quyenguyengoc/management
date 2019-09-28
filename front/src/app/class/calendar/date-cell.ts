import { LocalDataSource } from 'ng2-smart-table';
import { EventDate } from './event-date';
import { EventMemo } from './event-memo';

export class DateCell {
  id: number;
  date: string;
  eatingCost: number = 0;
  otherCost: number = 0;
  events: LocalDataSource;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  price(budget: number) {
    return budget - this.eatingCost;
  }

  cssForPrice(budget: number) {
    if (this.eatingCost > budget) {
      return 'bg-danger';
    } else if (this.eatingCost < budget) {
      return 'bg-success';
    } else {
      return 'bg-warning';
    }
  }

  async getEvents() {
    return await this.events.getAll();
  }

  updateCost(data: any) {
    this.eatingCost = data.eating_cost;
    this.otherCost = data.other_cost;
  }

  reloadEvent() {
    this.events.refresh();
  }

  loadEvents(events: EventDate[]) {
    this.events = new LocalDataSource(events.map((event: any) => {
      return new EventDate({
        id: event.id,
        title: event.title,
        price: event.price,
        type: event.cost_type === 'eating' ? '0' : '1',
        memo: event.memo.map((memo: any) => {
          return new EventMemo({
            id: memo.id,
            content: memo.content,
            price: memo.price,
            payerID: memo.payer_id
          })
        })
      })
    }));
  }
}
