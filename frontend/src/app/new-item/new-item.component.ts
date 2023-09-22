import { HttpClient } from '@angular/common/http';
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalService } from '../services/modal.service';
import { first } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent {
  itemData = {prep: "", name: ""};
  constructor(private _api: ApiService, private _router: Router, private _modal: ModalService, private _loader: LoaderService, private _viewContainer: ViewContainerRef) { }

  submitNewItem() {
    const newItemUrl = "state/newitem/"
    if (this.itemData.name=="") {
      alert("Name für Gegenstand fehlt!")
      return
    }
    this._loader.startLoading("sende...", this._viewContainer)
    this._api.sendData(newItemUrl, this.itemData).subscribe(res => {
      this._loader.endLoading()
      this._router.navigate(['..'])
    })
  }

  openModal(message: string, action: Function) {
    this._modal.openModal(message, this._viewContainer).pipe(first()).subscribe({
      next() {action()}, error() {console.log("error")}, complete() {console.log("complete")}
    })
  }

  getItemConfirmMessage() {
    return `Willst du den Gegestand "...mit ${this.itemData.prep} ${this.itemData.name}..." hinzufügen?`
  }

}
