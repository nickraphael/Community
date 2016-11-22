import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import 'rxjs/add/operator/map';

import { Blog } from '../models/blog.model';

@Injectable()
export class BlogService {

    public blogs$: FirebaseListObservable<Blog>;

    constructor(private angularFire: AngularFire) { 
        this.blogs$ = angularFire.database.list('/blogs').map(res => <Blog>res.json());
        
    } 

}
