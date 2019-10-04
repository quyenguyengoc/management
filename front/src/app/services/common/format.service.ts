import { Injectable } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {}

  date(date: Date = undefined, format: string = undefined) {
    return this.datePipe.transform(date || new Date(), format || 'yyyy-MM-dd');
  }

  to_vnd(value: number) {
    return this.currencyPipe.transform(value, 'VND', 'symbol', '', 'vi');
  }
}
