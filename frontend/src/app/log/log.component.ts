import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})
export class LogComponent {
  @Input() logData: any;
}
