import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.sass']
})
export class LogsComponent implements OnInit {

  logs: any[] = [];

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const logUrl = "http://127.0.0.1:8000/registry/logdata/";
    this._api.fetchData(logUrl).subscribe(
      res => this.logs = res
    )
  }
  

}
