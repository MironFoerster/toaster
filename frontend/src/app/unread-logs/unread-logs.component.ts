import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-unread-logs',
  templateUrl: './unread-logs.component.html',
  styleUrls: ['./unread-logs.component.sass']
})
export class UnreadLogsComponent implements OnInit {
  @Input() unreadLogs: any[];
  @Input() close: Function;
  @Output() closeEvent = new EventEmitter<void>()
  readingLog: any;
  readingLogSwitch: boolean = false;
  readingState: string
  sessionUsername: string

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    const userUrl = "userdata/";
    const unreadLogsUrl = "registry/unreadlogdata/";

    this._api.fetchData(userUrl).subscribe(res => {
      this.sessionUsername = res.username; console.log(res.username)
    })
    this._api.fetchData(unreadLogsUrl).subscribe(
      res => {
        this.unreadLogs = res;
        this.readingState = this.unreadLogs.length? "unread" : "nounread";
        console.log(this.unreadLogs)
        console.log(this.readingState)
      })
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
