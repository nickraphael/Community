import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { BlogService } from '../../services/blog.service'
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  blogs: Blog[] = [];
  private blogsSubscription: Subscription;

  constructor(private blogService: BlogService) {

  }

  ngOnInit() {
    //this.blogService.getFollowedBlogs((blogs: Blog[]) => {
    //  this.blogs = blogs;
    //});

    
    this.blogService.blogsFollowed$.subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
    });
    this.blogService.getFollowedBlogs();

    
    //this.blogsSubscription = this.blogService.blogsFollowed$.subscribe((blogs: Blog[]) => {
    //  this.blogs = blogs;
    //});
  }

  ngOnDestroy() {
    //this.blogsSubscription.unsubscribe();
  }

}
