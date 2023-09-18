import { Component, HostBinding, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Observable, combineLatest } from 'rxjs';
import { slideInOut } from '../app.animations';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.sass'],
  animations: [slideInOut]
})
export class LogsComponent implements OnInit {
  username: string

  entries: any[] = [];
  
  @HostBinding('@slideInOut') get slideInOut() {return}


  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const userUrl = "userdata/";
    const logUrl = "registry/logdata/";
    const infoUrl = "registry/infodata/";

    this._api.fetchData(userUrl).subscribe(res => {
      this.username = res.username; console.log(res.username)
    })
    const logObserve: Observable<any> = this._api.fetchData(logUrl)
    const infoObserve: Observable<any> = this._api.fetchData(infoUrl)

    combineLatest([logObserve, infoObserve]).subscribe(([logs, infos]) => {
      console.log(infos)
      this.entries = [...logs, ...infos].sort((a,b)=> b.date > a.date? 1 : -1)
      console.log(this.entries)
    });
  }
  

}
