import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api/api.service';

import { DateCell } from '../class/calendar/date-cell';

@Injectable({
  providedIn: 'root'
})
export class DateCellsService {

  constructor(private api: ApiService) {}

  getData(): Observable<DateCell[]> {
    return this.api.getCalendarData()
  }
}
