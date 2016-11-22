import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service'


@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
    
    blogs: any[];
    blog: any = null;
    displayEdit: boolean = false;

    constructor(private _blogService: BlogService) {
    }

    ngOnInit() {
        this._blogService.blogs$.subscribe((value: any[]) => {
                this.blogs = value;
            });
    }

    addNew() {
        this.blog = null;
        this.displayEdit = true;
    }

    editBlog(blog: any) {
        this.blog = blog;
        this.displayEdit = true;
    }

    blogEditClosed() {
        this.blog = null;
        this.displayEdit = false;
    }



}
