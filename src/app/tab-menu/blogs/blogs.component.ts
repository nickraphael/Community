import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service'
import { Blog } from '../../models/blog.model';


@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
    
    blogs: Blog[];
    blog: Blog;
    visibleBlogs: Blog[];
    displayEdit: boolean = false;
    visibleRows: number = 2;

    constructor(private _blogService: BlogService) {
    }

    ngOnInit() {
        this._blogService.blogs$.subscribe((value: Blog[]) => {
                this.blogs = value;
                this.displayRows()
            });
    }

    loadData(event) {
        if(this.blogs != undefined) {
            this.visibleRows = this.visibleRows + event.rows;
            this.displayRows();
        }
    }

    displayRows() {
        this.visibleBlogs = this.blogs.slice(0, this.visibleRows);        
    }

    addNew() {
        this.blog = null;
        this.displayEdit = true;
    }

    editBlog(blog: Blog) {
        this.blog = blog;
        this.displayEdit = true;
    }

    blogEditClosed() {
        this.blog = null;
        this.displayEdit = false;
    }



}
