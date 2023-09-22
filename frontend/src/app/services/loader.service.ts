import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderCompRef: ComponentRef<LoaderComponent>
  viewContainer: ViewContainerRef;

  constructor() { }
  startLoading(message: string, viewContainer: ViewContainerRef): void {
    console.log("start")
    this.loaderCompRef = viewContainer.createComponent(LoaderComponent)
    this.loaderCompRef.instance.message = message
  }

  endLoading() {
    console.log("end")

    this.loaderCompRef.destroy()
  }
}

