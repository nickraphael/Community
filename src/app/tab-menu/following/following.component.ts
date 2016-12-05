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
        this.blogsSubscription = this.blogService.blogs$
            .map((blogs: Blog[]) => {
                return blogs.filter((blog: Blog) => { return blog.userBlog !== null; } )
            })
            .subscribe((blogs: Blog[]) => {
                this.blogs = blogs;
            });
        //this.blogService.getFollowedBlogs();
    }

    ngOnDestroy() {
        this.blogsSubscription.unsubscribe();
    }

}
