import { Component, OnInit, OnDestroy, OnB } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { BlogService } from '../../services/blog.service'
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  private blogsSubscription: Subscription;

  constructor(private blogService: BlogService) {
    this.blogsSubscription = this.blogService.blogsFollowed$.subscribe(x => {
      console.log(x);
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.blogsSubscription.unsubscribe();
  }

}
