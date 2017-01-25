import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { LoginService } from '../../../services/login.service';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';
import { GrowlService } from '../../../services/growl.service';
import { Growl } from '../../../models/growl.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  @Input() blogs: Blog[];
  @Output() blogSelected: EventEmitter<Blog> = new EventEmitter<Blog>();

  visibleBlogs: Blog[];
  visibleRows: number = 2;

  private blogsSubscription: Subscription;

  constructor(private _blogService: BlogService,
    public loginService: LoginService,
    private _GrowlService: GrowlService) { }

  editBlog(blog: Blog) {
    this.blogSelected.next(blog);
  }

  follow(blog: Blog) {
    this._blogService.follow(blog, () => {
      let messageDetail = 'You are now following the '
        + blog.name + ' blog!';
      this._GrowlService.addGrowl(new Growl('success', 'Blog unfollowed', messageDetail));
    });
  }

  unfollow(blog: Blog) {
    this._blogService.unfollow(blog, () => {
      let messageDetail = 'You are no longer following the '
        + blog.name + ' blog!';
      this._GrowlService.addGrowl(new Growl('success', 'Blog unfollowed', messageDetail));
    });
  }

}
