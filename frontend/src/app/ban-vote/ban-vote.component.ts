import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ban-vote',
  templateUrl: './ban-vote.component.html',
  styleUrls: ['./ban-vote.component.sass']
})
export class BanVoteComponent {
  @Input() banData: any;
  @Output() requestClose = new EventEmitter();

  constructor(private _api: ApiService) {}

  voteBan(pro: boolean) {
    const voteBanUrl: string = "state/voteban/";
    this._api.sendData(voteBanUrl, {ban_id: this.banData.id, pro: pro}).subscribe(
      res => this.requestClose.emit()
    )
  }
}
