import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnChanges {
  @Input() blogs: Blog[];
  @Input() showFollowButton: boolean = false;
  @Output() blogSelected: EventEmitter<Blog> = new EventEmitter<Blog>();

  visibleBlogs: Blog[];
  visibleRows: number = 2;

  private blogsSubscription: Subscription;

  constructor(private _blogService: BlogService) { }

  ngOnChanges() {
    this.displayRows();
  }

  displayRows() {
    this.visibleBlogs = this.blogs.slice(0, this.visibleRows);
  }

  loadData(event) {
    if (this.blogs.length > 0) {
      this.visibleRows = this.visibleRows + event.rows;
      this.displayRows();
    }
  }

  editBlog(blog: Blog) {
    this.blogSelected.next(blog);
  }

  follow(blog: Blog) {
    this._blogService.follow(blog);
  }

}
