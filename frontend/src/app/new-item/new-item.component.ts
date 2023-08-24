import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent {
  private _newItemUrl = "http://127.0.0.1:8000/state/newitem/"
  itemData = {prep: "", name: ""};
  constructor(private _http: HttpClient, private _router: Router) { }

  submitNewItem() { // TODO: prevent empty
    console.log(this.itemData)
    this._http.post<any>(this._newItemUrl, this.itemData)
    .subscribe({next: res => {console.log(res)}, error: err => {console.log(err)}})
    this._router.navigate(['..']);
  }
}
