import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  title = 'Toastergame';

  constructor() {}

  ngAfterViewInit(): void {
    // let viewheight = window.document.documentElement.clientHeight;
    // let viewwidth = window.document.documentElement.clientWidth;
    // let viewport = document.createElement("meta");
    // viewport.name = "viewport"
    // viewport.content = "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0"
    // document.body.appendChild(viewport)
  }
}

