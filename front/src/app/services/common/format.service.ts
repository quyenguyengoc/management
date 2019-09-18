import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor(private datePipe: DatePipe) {}

  date(date: Date, format: string) {
    return this.datePipe.transform(date, format)
  }
}
