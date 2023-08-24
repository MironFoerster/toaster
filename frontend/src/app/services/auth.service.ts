import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://127.0.0.1:8000/login/"

  constructor(private _http: HttpClient, private _router: Router) { }

  loginUser(user: any) {
    return this._http.post<any>(this._loginUrl, user)
  }

  logoutUser() { // TODO add cleanup
    localStorage.removeItem('token');
    this._router.navigate(['login']);

  }

  isAuthenticated() {
    return !! localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
