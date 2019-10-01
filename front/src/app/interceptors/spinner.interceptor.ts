import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { SpinnerService } from '../../app/services/common/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterCeptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => this.spinner.hide())
    );
  }
}