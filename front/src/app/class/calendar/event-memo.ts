export class EventMemo {
  id: number = null;
  content: string;
  price: number = 0;
  payerID: number;
  isDestroy: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  available() {
    return !!!this.isDestroy;
  }

  emptyMemo() {
    return this.newMemo() && (!!!this.content || this.content.length == 0) && !!!this.payerID && !!!this.price;
  }

  newMemo() {
    return !!!this.id;
  }

  memoObj() {
    return {
      id: this.id,
      content: this.content,
      price: this.price,
      payer_id: Number(this.payerID),
      _destroy: this.isDestroy
    }
  }
}
