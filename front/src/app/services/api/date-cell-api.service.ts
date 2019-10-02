import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { DateCell } from '../../class/calendar/date-cell';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DateCellApiService {


  constructor(private http: HttpClient) { }

  public get_calendar_data(start_at: Date = new Date): Observable<DateCell[]> {
    return this.http
      .get<DateCell[]>(API_URL + '/date_cells', { params: this.init_params({ start_at: start_at }) })
      .catch(this.handle_error);
  }

  public get_events_by_date(id: number): Observable<any> {
    return this.http
      .get<any>(API_URL + '/date_cells/' + id)
      .catch(this.handle_error);
  }

  public save_date(id: number, date_cell: any): Observable<any> {
    return this.http
      .put<any>(API_URL + '/date_cells/' + id, { date_cell: date_cell})
      .catch(this.handle_error);
  }

  private handle_error (error: Response | any) {
    console.error('ApiService::handle_error', error);
    return Observable.throw(error);
  }

  private init_params(params: any): HttpParams {
    let http_params = new HttpParams()
    Object.keys(params).forEach((key: string) => {
      http_params = http_params.append(key, params[key]);
    });
    return http_params;
  }
}
