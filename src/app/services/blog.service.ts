import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/switchMap';

import { Blog } from '../models/blog.model';

@Injectable()
export class BlogService {

    public blogs$: FirebaseListObservable<Blog[]>;

    constructor(private angularFire: AngularFire) { 
        this.blogs$ = angularFire.database.list('/blogs');
    } 

    addBlog(_blog: Blog) {        
        //add new blog
        return this.blogs$.push(this.getDbObjectFromBlog(_blog));        
    }

    updateBlog(_blog: Blog) {
        //update blog in db
        let value = this.angularFire.database.object('/blogs/' + _blog.$key);

        return value.update(this.getDbObjectFromBlog(_blog));
    }

    getDbObjectFromBlog(_blog: Blog): Object {
        return {
            name: _blog.name,
            url: _blog.url != null ? _blog.url : '',
            imageUrl: _blog.imageUrl != null ? _blog.imageUrl : '',
            followers: _blog.followers != null ? _blog.followers : 0,
            dateAdded: _blog.dateAdded != null ? _blog.dateAdded : new Date()
        };
    }
}
