import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-ban-vote',
  templateUrl: './ban-vote.component.html',
  styleUrls: ['./ban-vote.component.sass']
})
export class BanVoteComponent {
  @Input() banData: any;
  @Output() requestClose = new EventEmitter();

  constructor(private _api: ApiService, private _viewContainer: ViewContainerRef, private _loader: LoaderService) {}

  voteBan(ban: boolean) {
    const voteBanUrl: string = "state/voteban/";
    this._loader.startLoading("sende...", this._viewContainer)
    this._api.sendData(voteBanUrl, {ban_id: this.banData.id, ban: ban}).subscribe(
      res => {
        this._loader.endLoading()
        this.requestClose.emit()
      }
    )
  }
}
