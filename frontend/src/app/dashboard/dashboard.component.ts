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
  sessionUsername: any;
  constructor(private _auth: AuthService, private _api: ApiService) { }

  ngOnInit(): void {
    const killvalUrl = "state/killvaldata/";
    const banUrl = "state/bandata/";
    const userUrl = "userdata/";

    this._api.fetchData(killvalUrl).subscribe(
      res => this.vals = res
    )
    this._api.fetchData(banUrl).subscribe(
      res => this.bans = res
    )
    this._api.fetchData(userUrl).subscribe(
      res => this.sessionUsername = res.username
    )
  }

  getQuestId(index: number, item: any): number {
    return item.id
  }

  closeVal(index: number) {
    this.vals.splice(index, 1)
  }
  
  getBanId(index: number, item: any): number {
    return item.id
  }

  closeBan(index: number) {
    this.bans.splice(index, 1)
  }

  logoutUser() {
    this._auth.logoutUser();
  }
}
