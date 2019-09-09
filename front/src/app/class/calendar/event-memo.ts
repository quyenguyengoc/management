export class EventMemo {
  id: number;
  content: string;
  price: number;
  isDestroy: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  available() {
    return !!this.isDestroy
  }
}
