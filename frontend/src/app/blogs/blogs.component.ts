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

  blogs: any[] = [];

  @HostBinding('@slideInOut') get slideInOut() {return}

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const blogUrl = "registry/blogdata/";
    this._api.fetchData(blogUrl).subscribe(
      res => this.blogs = res
    )
  }
  

}
