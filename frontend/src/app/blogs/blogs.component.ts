import { Component, HostBinding, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service'
import { slideInOut } from '../app.animations';
import { Observable, combineLatest } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.sass'],
  animations: [slideInOut]
})
export class BlogsComponent implements OnInit {
  sessionUsername: string
  newBlogState: string = "default"
  inputText: string
  blogs: any[] = [];

  @HostBinding('@slideInOut') get slideInOut() {return}

  constructor(private _api: ApiService, private _loader: LoaderService, private _viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    const blogUrl = "registry/blogdata/";
    const userUrl = "userdata/";
    
    this._loader.startLoading("lade blogs...", this._viewContainer)

    const userObserve: Observable<any> = this._api.fetchData(userUrl)
    const blogObserve: Observable<any> = this._api.fetchData(blogUrl)

    combineLatest([userObserve, blogObserve]).subscribe(([user, blogs]) => {
      this.sessionUsername = user.username; console.log(user.username)
      this.blogs = blogs
      this._loader.endLoading()
    })
  }

  submitNewBlog() {
    this.newBlogState=''
    const newBlogUrl = "registry/newblog/";
    this._api.sendData(newBlogUrl, {text: this.inputText}).subscribe(
      res => this.blogs.unshift(res)
    )
  }

  parseDate(isoDateString: string) {
    const date = new Date(isoDateString)

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }

    return date.toLocaleDateString('de-DE', options)
  }

}
