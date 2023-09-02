import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.sass']
})
export class LogsComponent implements OnInit {

  entries: any[] = [];

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const logUrl = "registry/logdata/";
    const infoUrl = "registry/infodata/";

    const logObserve: Observable<any> = this._api.fetchData(logUrl)
    const infoObserve: Observable<any> = this._api.fetchData(infoUrl)

    combineLatest([logObserve, infoObserve]).subscribe(([logs, infos]) => {
      this.entries = [...logs, ...infos].sort((a,b)=>{return a.date - b.date;})
    });
  }
  

}
