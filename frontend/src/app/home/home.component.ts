import { Component, OnInit, Renderer2, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { trigger, transition, style, animate, } from '@angular/animations';
import { ApiService } from '../services/api.service';
import { NavigationEnd, Router } from '@angular/router';

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
  showUnreadLogs: boolean = true
  
  constructor(private _auth: AuthService, private _api: ApiService) { }

  ngOnInit(): void {
    const blogUrl = "registry/unreadlogdata/";
    this._api.fetchData(blogUrl).subscribe(
      res => {
        this.unreadLogs = res;
      }
    )
  }

  closeUnreadLogs() {
    this.unreadLogs = [];
    this.showUnreadLogs = false
  }

  userIsAuthenticated() {
    return this._auth.isAuthenticated();
  }
}