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

  private blogsSubscription: Subscription;

  constructor(private blogService: BlogService) { 

  }

  ngOnInit() {
    this.blogsSubscription = this.blogService.blogsFollowed$.subscribe(x => {
      console.log(x);
    })
  }

  ngOnDestroy(){
    this.blogsSubscription.unsubscribe();
  }

}
