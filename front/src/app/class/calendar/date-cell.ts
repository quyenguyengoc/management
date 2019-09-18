import { LocalDataSource } from 'ng2-smart-table';

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
}
