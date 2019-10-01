import { EventMemo } from './event-memo';

export class EventDate {
  id: number = null;
  title: string;
  memo: EventMemo[] = [new EventMemo()];
  price: number = 0;
  expense_type: number;
  is_destroy: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  available() {
    return !!this.is_destroy
  }

  add_new_memo() {
    this.memo.push(new EventMemo());
  }

  new_object?() {
    return !!!this.id;
  }

  empty_memo() {
    return this.memo.filter((memo: EventMemo) => { return (memo.available() && !!!memo.empty_memo()) }).length === 0;
  }

  event_obj() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      expense_type: Number(this.expense_type),
      _destroy: this.is_destroy || this.empty_memo(),
      memo_details_attributes: this.memo_obj()
    }
  }

  memo_obj() {
    return this.memo.filter((memo: EventMemo) => !!!memo.empty_memo() ).map((memo: EventMemo) => {
      return memo.memo_obj();
    })
  }

  toggle_delete_event() {
    this.is_destroy = !this.is_destroy;
    this.price = 0;
    this.memo.forEach((memo: EventMemo) => {
      memo.is_destroy = this.is_destroy;
      if (!!!memo.is_destroy) {
        this.price += memo.price;
      }
    })
  }
 }
