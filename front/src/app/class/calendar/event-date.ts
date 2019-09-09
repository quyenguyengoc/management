import { EventMemo } from './event-memo';

export class EventDate {
  id: number;
  title: string;
  memo: EventMemo[] = [new EventMemo()];
  price: number;
  type: string = '';
  isDestroy: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  available() {
    return !!this.isDestroy
  }

  addNewMemo() {
    this.memo.push(new EventMemo());
  }
 }
