import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.sass']
})
export class QuestsComponent implements OnInit {
  quests: any[] = []

  constructor(private _api: ApiService, private _loader: LoaderService, private _viewContainer: ViewContainerRef) {}

  loadQuests() {
    const questUrl: string = "state/questdata/";
    this._loader.startLoading("lade quests...", this._viewContainer)
    this._api.fetchData(questUrl).subscribe(res => {
      this._loader.endLoading()
      this.quests = res
    })
  }

  getQuestId(index: number, item: any): number {
    return item.id
  }

  ngOnInit() {
    this.loadQuests()
  }
}
