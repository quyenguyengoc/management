export class EventMemo {
  id: number = null;
  content: string;
  price: number = 0;
  payer_id: number;
  is_destroy: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  available() {
    return !!!this.is_destroy;
  }

  empty_memo() {
    return this.new_memo() && (!!!this.content || this.content.length == 0) && !!!this.payer_id && !!!this.price;
  }

  new_memo() {
    return !!!this.id;
  }

  memo_obj() {
    return {
      id: this.id,
      content: this.content,
      price: this.price,
      payer_id: Number(this.payer_id),
      _destroy: this.is_destroy
    }
  }
}
