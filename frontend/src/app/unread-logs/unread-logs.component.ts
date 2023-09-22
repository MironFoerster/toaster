import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, combineLatest } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-unread-logs',
  templateUrl: './unread-logs.component.html',
  styleUrls: ['./unread-logs.component.sass']
})
export class UnreadLogsComponent implements OnInit {
  unreadLogs: any[];
  @Output() closeEvent = new EventEmitter<void>()
  readingLog: any;
  readingLogSwitch: boolean = false;
  readingState: string
  sessionUsername: string

  constructor(private _api: ApiService, private _loader: LoaderService, private _viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    const userUrl = "userdata/";
    const unreadLogsUrl = "registry/unreadlogdata/";

    this._loader.startLoading("lade logs...", this._viewContainer)

     const userObserve: Observable<any> = this._api.fetchData(userUrl)
     const unreadlogsObserve: Observable<any> = this._api.fetchData(unreadLogsUrl)
 
     combineLatest([userObserve, unreadlogsObserve]).subscribe(([user, logs]) => {
        this._loader.endLoading()
        this.sessionUsername = user.username
        this.unreadLogs = logs;
        this.readingState = this.unreadLogs.length? "unread" : "nounread";
     });
  }


  handleButtonClick(event: any) {
    console.log("clickoverlay", this.readingState)
    switch (this.readingState) {
      case 'nounread':
        this.closeEvent.emit()
        break;
      case 'unread':
        this.readingState = "reading";
        this.readingLog = this.unreadLogs.pop()
        this.readingLogSwitch = true;
        break;
      case 'reading':
        this.readingLogSwitch = false;
        this.readingLog = this.unreadLogs.pop()
        if (this.unreadLogs.length === 0) {
          this.readingState = "read";
        }
        setTimeout(() => this.readingLogSwitch = true, 505)
        
        break;
      case 'read':
        this.closeEvent.emit()
        break;
    }
  }
}
