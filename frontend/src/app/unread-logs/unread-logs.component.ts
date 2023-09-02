import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-unread-logs',
  templateUrl: './unread-logs.component.html',
  styleUrls: ['./unread-logs.component.sass']
})
export class UnreadLogsComponent {
  @Input() unreadLogs: any[];
  @Input() close: Function;
  readingLog: any;
  readingLogSwitch: boolean = false;
  readingState: string = "unread";

  readNextLog() {
 

  }

  handleButtonClick(event: any) {
    switch (this.readingState) {
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
        setTimeout(() => this.readingLogSwitch = true, 1)
        
        break;
      case 'read':
        this.close()
        break;
    }
  }
}
