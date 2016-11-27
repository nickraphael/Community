import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { BlogService } from '../../services/blog.service'
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  private blogs$: Observable<Blog[]>;

  constructor(private blogService: BlogService) { 

  }

  ngOnInit() {
    this.blogs$ = this.blogService.blogsFollowed$;
    
    this.blogs$.subscribe(x => {
      console.log(x);
    })
  }

  ngOnDestroy(){
    //this.blogs$.unsubscribe();
  }

}
