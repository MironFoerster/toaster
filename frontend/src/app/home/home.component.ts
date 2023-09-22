import { Component, OnInit, Renderer2, ViewChildren, ElementRef, QueryList, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { trigger, transition, style, animate, } from '@angular/animations';
import { ApiService } from '../services/api.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
      ]),
      transition(':leave', [
        animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
        style({ opacity: 0 }),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  unreadLogs: any[] = [];
  showUnreadLogs: boolean = localStorage.getItem("read_logs")? false : true
  
  constructor(private _auth: AuthService, private _api: ApiService, private _viewContainer: ViewContainerRef, private _loader: LoaderService) { }

  ngOnInit(): void {
    // if (this.showUnreadLogs) {
    //   const unreadlogUrl = "registry/unreadlogdata/";
    //   this._loader.startLoading("lade neue Ereignisse...", this._viewContainer)
    //   this._api.fetchData(unreadlogUrl).subscribe(
    //     res => {
    //       this._loader.endLoading()
    //       this.unreadLogs = res;
    //     }
    //   )
    // }
  }

  closeUnreadLogs() {
    //this.unreadLogs = [];
    this.showUnreadLogs = false
    localStorage.setItem("read_logs", "true")
  }

  userIsAuthenticated() {
    return this._auth.isAuthenticated();
  }
}