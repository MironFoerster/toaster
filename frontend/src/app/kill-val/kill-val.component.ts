import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kill-val',
  templateUrl: './kill-val.component.html',
  styleUrls: ['./kill-val.component.sass']
})
export class KillValComponent {
  @Input() valData: any;
}
