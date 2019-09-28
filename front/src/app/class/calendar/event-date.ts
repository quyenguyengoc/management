import { EventMemo } from './event-memo';

export class EventDate {
  id: number = null;
  title: string;
  memo: EventMemo[] = [new EventMemo()];
  price: number = 0;
  type: number;
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

  newObject() {
    return !!!this.id;
  }

  emptyMemo() {
    return this.memo.filter((memo: EventMemo) => { return (memo.available() && !!!memo.emptyMemo()) }).length === 0;
  }

  eventObj() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      cost_type: Number(this.type),
      _destroy: this.isDestroy || this.emptyMemo(),
      memo_details_attributes: this.memoObj()
    }
  }

  memoObj() {
    return this.memo.filter((memo: EventMemo) => !!!memo.emptyMemo() ).map((memo: EventMemo) => {
      return memo.memoObj();
    })
  }

  toggleDeleteEvent() {
    this.isDestroy = !this.isDestroy;
    this.price = 0;
    this.memo.forEach((memo: EventMemo) => {
      memo.isDestroy = this.isDestroy;
      if (!!!memo.isDestroy) {
        this.price += memo.price;
      }
    })
  }
 }
