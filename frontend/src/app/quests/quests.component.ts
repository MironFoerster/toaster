import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.sass']
})
export class QuestsComponent implements OnInit {
  quests: any[] = []

  constructor(private _api: ApiService) {}

  loadQuests() {
    const questUrl: string = "state/questdata/";
    this._api.fetchData(questUrl).subscribe(
      res => this.quests = res
    )
  }

  getQuestId(index: number, item: any): number {
    return item.id
  }

  ngOnInit() {
    this.loadQuests()
  }
}
