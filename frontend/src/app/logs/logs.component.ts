import { AfterViewInit, ViewContainerRef, Component, HostBinding, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Observable, combineLatest } from 'rxjs';
import { slideInOut } from '../app.animations';
import { LoaderService } from '../services/loader.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.sass'],
  animations: [slideInOut]
})
export class LogsComponent implements OnInit {
  sessionUsername: string
  entries: any[] = [];
  
  @HostBinding('@slideInOut') get slideInOut() {return}


  constructor(private _api: ApiService, private _loader: LoaderService, private _modal: ModalService, private _viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
     //this._modal.openModal("hihihi", this._viewContainer)
     const userUrl = "userdata/";
     const logUrl = "registry/logdata/";
     const infoUrl = "registry/infodata/";

     this._loader.startLoading("lade logs...", this._viewContainer)

     const userObserve: Observable<any> = this._api.fetchData(userUrl)
     const logObserve: Observable<any> = this._api.fetchData(logUrl)
     const infoObserve: Observable<any> = this._api.fetchData(infoUrl)
 
     combineLatest([userObserve, logObserve, infoObserve]).subscribe(([user, logs, infos]) => {
       console.log(infos)
       this.sessionUsername = user.username
       this.entries = [...logs, ...infos].sort((a,b)=> b.date > a.date? 1 : -1)
       console.log(this.entries)
       this._loader.endLoading()
     });
  }
}
