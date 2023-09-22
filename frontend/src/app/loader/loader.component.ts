import { Component, ComponentRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent {
  @Input() message: string;

  constructor() {}
}
