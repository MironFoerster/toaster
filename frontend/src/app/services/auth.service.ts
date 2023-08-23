import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://127.0.0.1:8000/login/"

  constructor(private _http: HttpClient) { }

  loginUser(user: any) {
    return this._http.post<any>(this._loginUrl, user)
  }

  logoutUser(user: any) { // TODO add cleanup
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    console.log(localStorage.getItem('token'));
    return !! localStorage.getItem('token')
  }
}
