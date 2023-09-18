import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModalService } from '../services/modal.service';
import { first } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.sass'],
  animations: [
    trigger('questEnterLeave', [
      transition(':enter', [
        style({opacity: 0, height: 0}),
        sequence([
          animate('0.5s 0.2s ease', style({height: "33.33%"})),
          animate('0.2s ease', style({opacity: 1})),
        ])
      ]),
      transition(':leave', [
        style({opacity: 1, height: "33.33%"}),
        sequence([
          animate('0.2s ease', style({opacity: 0})),
          animate('0.5s ease', style({height: "0%"})),
        ])
      ])
    ])
  ]
})
export class QuestComponent {
  @Input() questData: any;
  @Output() questRemoved = new EventEmitter();

  @HostBinding('@questEnterLeave') get questEnterLeave() {
    return "true"
  }

  distance: number;
  ban_note: string;
  modalMessage: string;
  modalAction: Function;
  showModal: boolean;
  actionState: string = ''

  constructor(private _api: ApiService, private _modal: ModalService, private _viewContainer: ViewContainerRef) {}

  openCard() {
    this.questData.unopened = false

    const questOpenedUrl: string = "state/setquestopened/";
    this._api.sendData(questOpenedUrl, {quest_id: this.questData.id}).subscribe(
      res => this.questData.state = "active"
    )
  }

  openActions() {
    if (this.actionState=="") {
      this.actionState = 'open'
    }
  }

  changeActionTo(event: any, action: string) {
    event.stopPropagation()
    this.actionState = action
  }

  surrender() {
    const surrenderQuestUrl: string = "state/surrenderquest/";
    this._api.sendData(surrenderQuestUrl, {quest_id: this.questData.id}).subscribe(
      res => this.questRemoved.emit()
    )
  }

  requestKillVal() {
    const requestValUrl: string = "state/requestkillval/";
    this._api.sendData(requestValUrl, {quest_id: this.questData.id, distance: this.distance}).subscribe(
      res => this.questData.state = "validating"
    )
  }

  initBan() {
    const initBanUrl: string = "state/initiateban/";
    console.log(this.questData)
    this._api.sendData(initBanUrl, {item_id: this.questData.item.id, note: this.ban_note}).subscribe(
      res => this.questData.item.ban_state = "banning"
    )
  }

  getSuccessConfirmMessage(): string {
    return `Du hast ${this.questData.victim.username} aus einer Entfernung von ${ this.distance } km mit ${ this.questData.item.prep } ${ this.questData.item.name } ${ this.questData.verb.ge }?`
  }

  openModal(message: string, action: Function) {
    this._modal.openModal(message, this._viewContainer).pipe(first()).subscribe({
      next() {action()}, error() {console.log("error")}, complete() {console.log("complete")}
    })
  }

  stringWrap(val: string): string {
    return '"'+val+'"'
  }
  log(t: string) {
    console.log(t)
  }
}
