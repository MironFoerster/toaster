import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginUserData = {username: "", password: ""}

  constructor(private _auth: AuthService, private _router: Router) { }

  loginSuccess(res: { token: string; }) {
    localStorage.setItem('token', res.token);
    this._router.navigate(['']);
  }

  loginFailure(err: { message: any; }) {
    console.log(err.message)
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe({next: this.loginSuccess.bind(this), error: this.loginFailure.bind(this)})
  }

}
