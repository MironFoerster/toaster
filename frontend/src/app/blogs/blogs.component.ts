import { Component, HostBinding, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { slideInOut } from '../app.animations';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.sass'],
  animations: [slideInOut]
})
export class BlogsComponent implements OnInit {
  newBlogState: string = "default"
  inputText: string
  blogs: any[] = [];

  @HostBinding('@slideInOut') get slideInOut() {return}

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const blogUrl = "registry/blogdata/";
    this._api.fetchData(blogUrl).subscribe(
      res => this.blogs = res
    )
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
