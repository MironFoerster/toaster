import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  constructor(private _auth: AuthService) { }

  logoutUser() {
    this._auth.logoutUser();
  }
}
