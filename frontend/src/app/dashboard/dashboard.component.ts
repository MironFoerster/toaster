import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ApiService } from '../services/api.service'
import { LoaderService } from '../services/loader.service';
import { Observable, combineLatest } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  vals: any[] = [];
  bans: any[] = [];
  sessionUsername: any;
  constructor(private _auth: AuthService, private _api: ApiService, private _loader: LoaderService, private _viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    const killvalUrl = "state/killvaldata/";
    const banUrl = "state/bandata/";
    const userUrl = "userdata/";

    this._loader.startLoading("lade dashboard...", this._viewContainer)

    const userObserve: Observable<any> = this._api.fetchData(userUrl)
    const killvalObserve: Observable<any> = this._api.fetchData(killvalUrl)
    const banObserve: Observable<any> = this._api.fetchData(banUrl)

    combineLatest([userObserve, killvalObserve, banObserve]).subscribe(([user, vals, bans]) => {
      this.sessionUsername = user.username
      this.bans = bans
      this.vals = vals
      this._loader.endLoading()
    })

    // this._api.fetchData(killvalUrl).subscribe(
    //   res => this.vals = res
    // )
    // this._api.fetchData(banUrl).subscribe(
    //   res => this.bans = res
    // )
    // this._api.fetchData(userUrl).subscribe(
    //   res => this.sessionUsername = res.username
    // )
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
