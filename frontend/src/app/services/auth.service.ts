import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "auth/login/"

  constructor(private _http: HttpClient, private _api: ApiService) { }

  loginUser(user: any): Observable<any> {
    return this._api.sendData(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.clear();
    window.location.reload();
  }

  isAuthenticated() {
    return !! localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
