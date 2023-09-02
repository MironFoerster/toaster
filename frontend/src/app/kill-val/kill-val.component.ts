import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-kill-val',
  templateUrl: './kill-val.component.html',
  styleUrls: ['./kill-val.component.sass']
})
export class KillValComponent {
  @Input() valData: any;

  constructor(private _api: ApiService) {}

  submitKillVal(valid: boolean) {
    const submitValUrl: string = "state/submitkillval/";
    this._api.sendData(submitValUrl, {quest_id: this.valData.id}).subscribe(
      res => console.log(res)
    )
  }
}
