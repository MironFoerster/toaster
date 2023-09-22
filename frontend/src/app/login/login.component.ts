import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginUserData = {username: "", password: ""}

  constructor(private _auth: AuthService, private _router: Router, private _loader: LoaderService, private _viewContainer: ViewContainerRef) { }

  loginSuccess(res: { token: string; }) {
    this._loader.endLoading()
    localStorage.setItem('token', res.token);
    this._router.navigate(['stats']);
  }

  loginFailure(err: { message: any; }) {
    console.log(err.message)
  }

  loginUser() {
    this._loader.startLoading("sende...", this._viewContainer)
    this._auth.loginUser(this.loginUserData)
      .subscribe({next: this.loginSuccess.bind(this), error: this.loginFailure.bind(this)})
  }

}
