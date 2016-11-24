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

}
