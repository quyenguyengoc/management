import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  onRequest: Subject<boolean> = new Subject<boolean>();

  show() {
    this.onRequest.next(true);
  }

  hide() {
    this.onRequest.next(false);
  }

  constructor() { }
}
