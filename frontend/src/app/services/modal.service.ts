import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private confirm$: Subject<void>;

  viewContainer: ViewContainerRef;

  constructor() { }
  openModal(message: string, viewContainer: ViewContainerRef): Observable<void> {
    const modalCompRef = viewContainer.createComponent(ConfirmModalComponent)

    modalCompRef.instance.message = message
    modalCompRef.instance.selfRef = modalCompRef
    modalCompRef.instance.confirmEvent.subscribe(() => this.confirmModal())
    modalCompRef.instance.cancelEvent.subscribe(() => this.cancelModal())


    this.confirm$ = new Subject()

    return this.confirm$.asObservable()
  }

  confirmModal() {
    this.confirm$.next()
    this.confirm$.complete()
  }

  cancelModal() {
    this.confirm$.complete()
  }
}
