import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent {
  @Input() message: string;
  @Input() action: Function;
  @Input() close: Function;
}
