import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor(private datePipe: DatePipe) {}

  date(date: Date = undefined, format: string = undefined) {
    return this.datePipe.transform(date || new Date(), format || 'yyyy-MM-dd');
  }
}
