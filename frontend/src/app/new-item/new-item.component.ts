import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent {
  itemData = {prep: "", name: ""};
  constructor(private _api: ApiService, private _router: Router) { }

  submitNewItem() { // TODO: prevent empty
    const newItemUrl = "state/newitem/"
    if (this.itemData.name=="") {
      alert("Name für Gegenstand fehlt!")
      return
    }
    this._api.sendData(newItemUrl, this.itemData)
    .subscribe({next: res => {console.log(res)}, error: err => {console.log(err)}})
    this._router.navigate(['..']);
  }
}
