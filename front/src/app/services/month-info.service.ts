import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MonthInfoApiService } from './api/month-info-api.service';

@Injectable({
  providedIn: 'root'
})
export class MonthInfoService {

  constructor(private api: MonthInfoApiService) {}

  save_month_info(month_info: any): Observable<any> {
    return this.api.save_month_info(month_info);
  }
}
