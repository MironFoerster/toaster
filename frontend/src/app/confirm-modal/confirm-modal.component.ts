import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent {
  @Input() message: string;
  @Input() selfRef: ComponentRef<any>;
  @Output() confirmEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  constructor(private _modal: ModalService) {}

  confirm() {
    this.selfRef.destroy()
    this.confirmEvent.emit()
  }

  cancel() {
    this.selfRef.destroy()
    this.cancelEvent.emit()
  }
}
