import { Component, Input, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModalService } from '../services/modal.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.sass']
})
export class QuestComponent {
  @Input() questData: any;

  distance: number;
  modalMessage: string;
  modalAction: Function;
  showModal: boolean;
  enterDistance: boolean = false;

  constructor(private _api: ApiService, private _modal: ModalService, private _viewContainer: ViewContainerRef) {}

  openCard() {
    this.questData.unopened = false

    const openedQuestUrl: string = "state/openedquestsubmit/";
    this._api.sendData(openedQuestUrl, {quest_id: this.questData.id}).subscribe(
      res => console.log(res)
    )
  }

  surrender() {
    const surrenderQuestUrl: string = "state/surrenderquest/";
    this._api.sendData(surrenderQuestUrl, {quest_id: this.questData.id}).subscribe(
      res => console.log(res)
    )
  }

  requestKillVal() {
    const requestValUrl: string = "state/requestkillval/";
    this._api.sendData(requestValUrl, {quest_id: this.questData.id, distance: this.distance}).subscribe(
      res => console.log(res)
    )
  }

  openModal(message: string, action: Function) {
    this._modal.open(message, this._viewContainer).pipe(first()).subscribe({
      next() {action()}, error() {console.log("error")}, complete() {console.log("complete")}
    })
  }
}
