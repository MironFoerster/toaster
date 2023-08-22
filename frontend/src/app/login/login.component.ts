import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginUserData = {username: "", password: ""}
  constructor(private _auth: AuthService) { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        {next: res => {console.log(res)}, error: err => {console.log(err.message)}}
        )
  }

}
