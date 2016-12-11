import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';


@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

    blogs: Blog[] = [];
    blog: Blog = null;
    visibleBlogs: Blog[] = [];
    displayEdit: boolean = false;
    visibleRows: number = 2;
    showFollowButton: boolean = true;

    private blogsSubscription: Subscription;
    private followedBlogsSubscription: Subscription;

    constructor(private blogService: BlogService) {
    }

    ngOnInit() {
        this.blogsSubscription = this.blogService.blogs$.subscribe((blogs: Blog[]) => {
            this.blogs = blogs;
        });
    }

    ngOnDestroy() {
        this.blogsSubscription.unsubscribe();
    }

    addNew() {
        this.blog = new Blog({});
        this.displayEdit = true;
    }

    blogSelected(blog: Blog) {
        this.blog = blog;
        this.displayEdit = true;
    }

    blogEditVisibilityChanged(isVisible) {
        this.displayEdit = isVisible;
        this.blog = null;
    }

}
