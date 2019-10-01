import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DateCell } from '../class/calendar/date-cell';

import { DateCellsService } from '../services/date-cells.service';

@Injectable()
export class DateCellsResolver implements Resolve<Observable<DateCell[]>> {

  constructor(private service: DateCellsService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DateCell[]> {
    return this.service.get_date();
  }
}
