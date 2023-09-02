import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiHeaders = new HttpHeaders({
    'X-ApiRequest': 'true'
  })

  constructor(private _http: HttpClient) { }

  fetchData(apiUrl: string): Observable<any> {
    return this._http.get(apiUrl, {headers: this.apiHeaders});
  }
  
  sendData(apiUrl: string, data: unknown): Observable<any> {
    if (typeof data !== "object") {
      data = {error: "unable to send data"};
    }
    return this._http.post(apiUrl, data, {headers: this.apiHeaders});

  }
}
