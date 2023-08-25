import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.sass']
})
export class BlogsComponent implements OnInit {

  blogs: any[] = [];

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const blogUrl = "http://127.0.0.1:8000/registry/blogdata/";
    this._api.fetchData(blogUrl).subscribe(
      res => this.blogs = res
    )
  }
  

}
