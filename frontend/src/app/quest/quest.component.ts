import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

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
  modalVisible: boolean;
  enterDistance: boolean = false;

  constructor(private _api: ApiService) {}

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
    this.modalMessage = message
    this.modalAction = action
    this.modalVisible = true
  }
  closeModal() {
    this.modalVisible = true
  }
}
