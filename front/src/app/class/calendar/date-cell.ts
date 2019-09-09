import { EventDate } from './event-date';

export class DateCell {
  date: Date;
  eatingCost: number;
  otherCost: number;
  events: EventDate[];

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  price(budget) {
    return budget - this.eatingCost;
  }

  cssForPrice(budget) {
    if (this.eatingCost > budget) {
      return 'bg-danger';
    } else if (this.eatingCost < budget) {
      return 'bg-success';
    } else {
      return 'bg-warning';
    }
  }
}
