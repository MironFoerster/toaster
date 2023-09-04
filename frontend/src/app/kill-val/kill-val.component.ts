import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-kill-val',
  templateUrl: './kill-val.component.html',
  styleUrls: ['./kill-val.component.sass']
})
export class KillValComponent {
  @Input() valData: any;
  @Output() requestClose = new EventEmitter();

  constructor(private _api: ApiService) {}

  validateKill(valid: boolean) {
    const submitValUrl: string = "state/validatekill/";
    this._api.sendData(submitValUrl, {quest_id: this.valData.id, valid: valid}).subscribe(
      res => this.requestClose.emit()
    )
  }
}
