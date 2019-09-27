import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { DateCell } from '../../../class/calendar/date-cell';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  public getCalendarData(): Observable<DateCell[]> {
    return this.http
      .get<DateCell[]>(API_URL + '/date_cells')
      .catch(this.handleError);
  }

  public getEventsByDate(id: number): Observable<any> {
    return this.http
      .get<any>(API_URL + '/date_cells/' + id)
      .catch(this.handleError);
  }

  public saveDate(id: number, date_cell: any): Observable<any> {
    return this.http
      .put<any>(API_URL + '/date_cells/' + id, { date_cell: date_cell})
      .catch(this.handleError);
  }
  

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
