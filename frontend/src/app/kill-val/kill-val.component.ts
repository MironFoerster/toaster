import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-kill-val',
  templateUrl: './kill-val.component.html',
  styleUrls: ['./kill-val.component.sass']
})
export class KillValComponent {
  @Input() valData: any;
  @Output() requestClose = new EventEmitter();

  constructor(private _api: ApiService, private _viewContainer: ViewContainerRef, private _loader: LoaderService) {}

  validateKill(valid: boolean) {
    const submitValUrl: string = "state/validatekill/";
    this._loader.startLoading("sende...", this._viewContainer)
    this._api.sendData(submitValUrl, {quest_id: this.valData.id, valid: valid}).subscribe(res => {
        this._loader.endLoading()
        this.requestClose.emit()
      }
    )
  }
}
