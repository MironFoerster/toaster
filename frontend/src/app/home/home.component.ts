import { AfterViewInit, Component, Renderer2, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { trigger, transition, style, animate, } from '@angular/animations';
import { ApiService } from '../services/api.service';

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
export class HomeComponent implements AfterViewInit {
  unreadLogs: any[] = [];
  showUnreadLogs: boolean = false
  @ViewChildren('new_logs_container', { read: ElementRef }) newLogElements: QueryList<ElementRef>;
  
  constructor(private _auth: AuthService, private _api: ApiService) { }


  ngAfterViewInit(): void {
    if (this._auth.isAuthenticated()) {
      const blogUrl = "registry/newlogdata/";
      this._api.fetchData(blogUrl).subscribe(
        res => {
          this.unreadLogs = res;
          this.showUnreadLogs = true;
        }
      )
    }
  }

  closeUnreadLogs() {
    this.unreadLogs = [];
    this.showUnreadLogs = false
  }

  userIsAuthenticated() {
    return this._auth.isAuthenticated();
  }
}