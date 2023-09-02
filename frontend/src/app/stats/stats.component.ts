import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {
  statsData: any[];
  constructor(private _api: ApiService) { }

  ngOnInit() {
    const statsUrl = "registry/statsdata/"
    this._api.fetchData(statsUrl).subscribe(
      res => this.statsData = res
    )
  }
}
