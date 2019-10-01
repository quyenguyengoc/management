import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DateCellApiService } from './api/date-cell-api.service';

import { DateCell } from '../class/calendar/date-cell';

@Injectable({
  providedIn: 'root'
})
export class DateCellsService {

  constructor(private api: DateCellApiService) {}

  get_date(): Observable<DateCell[]> {
    return this.api.get_calendar_data()
  }

  get_events(id: number): Observable<any> {
    return this.api.get_events_by_date(id);
  }

  save_date(id: number, date_cell: any): Observable<any> {
    return this.api.save_date(id, date_cell);
  }
}
