import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  readonly apiBaseUrl = "http://127.0.0.1:8000/"; //"https://site--toasterapi--2vd4knhkkhn9.code.run/";
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('X-ApiRequest') === 'true') {
      console.log("with header")
      const apiRequest = request.clone({ url: `${this.apiBaseUrl}${request.url}` });
      return next.handle(apiRequest);
    } else {
      console.log("no header")

      return next.handle(request);
    }
  }
}
