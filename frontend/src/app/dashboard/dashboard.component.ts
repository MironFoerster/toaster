import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ApiService } from '../services/api.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  vals: any[] = [];
  bans: any[] = [];
  constructor(private _auth: AuthService, private _api: ApiService) { }

  ngOnInit(): void {
    const killvalUrl = "state/killvaldata/";
    const banUrl = "state/bandata/";
    this._api.fetchData(killvalUrl).subscribe(
      res => this.vals = res
    )
    this._api.fetchData(banUrl).subscribe(
      res => this.bans = res
    )
  }
  logoutUser() {
    this._auth.logoutUser();
  }
}
