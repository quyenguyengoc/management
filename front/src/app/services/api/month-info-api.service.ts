import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MonthInfoApiService {

  constructor(private http: HttpClient) { }

  public save_month_info(month_info: any): Observable<any> {
    return this.http
      .put<any>(API_URL + '/month_infos/' + month_info.id, { month_info: month_info})
      .catch(this.handle_error);
  }

  private handle_error (error: Response | any) {
    console.error('ApiService::handle_error', error);
    return Observable.throw(error);
  }
}
