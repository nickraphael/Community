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
        return this.blogs$.push({
            name: _blog.name,
            url: _blog.url
        });        
    }

    updateBlog(_blog: Blog) {
        //update blog in db
        let value = this.angularFire.database.object('/blogs/' + _blog.$key);

        return value.update({
            name: _blog.name,
            url: _blog.url
        });
    }

}
