import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable, ReplaySubject, Observer } from 'rxjs';

import 'rxjs/add/operator/switchMap';

import { Blog } from '../models/blog.model';
import { LoginService } from './login.service'
import { User } from '../models/user.model';
import { UserBlog } from '../models/userBlog.model';

@Injectable()
export class BlogService {

    public blogs$: Observable<Blog[]>;
    public blogsFollowed$: Observable<Blog[]>;
    public blogsFollowedObserver: Observer<Blog[]> = null;

    private firebaseBlogs$: FirebaseListObservable<Blog[]>;
    private firebaseUserBlogs$: FirebaseListObservable<UserBlog[]> = null;

    constructor(private angularFire: AngularFire, private loginService: LoginService) {
        this.firebaseBlogs$ = angularFire.database.list('/blogs');

        this.blogsFollowed$ = new Observable<Blog[]>(observer => this.blogsFollowedObserver = observer);

        this.blogs$ = this.firebaseBlogs$
            .map((fireBlogs: any) => {
                return fireBlogs.map((fireBlog: any) => new Blog(fireBlog.$key, fireBlog.name, fireBlog.url, fireBlog.imageUrl, fireBlog.followers));
            });

        loginService.user$.subscribe((user: User) => {
            if (user === null) {
                this.blogsFollowedObserver.next([]);
            }
            else {
                this.firebaseUserBlogs$ = this.angularFire.database.list('/users/' + user.authKey + '/blogs');

                if (this.blogsFollowedObserver != null) {
                    this.getFollowedBlogs();
                }
            }
        });
    }

    getFollowedBlogs() {
        if (this.loginService.user != null) {
            this.angularFire.database.list('/users/' + this.loginService.user.authKey + '/blogs')
                .map(followedBlogs => {
                    return followedBlogs.map(followedBlog => {
                        return this.angularFire.database.object('/blogs/' + followedBlog.blogKey)
                    });
                })
                .do(console.log)
                // map over each array of observable and merge them into one stream and combine the observables into one 
                .mergeMap((followedBlog$: any) => {
                    return Observable.combineLatest(followedBlog$)
                })
                .subscribe((blogs: Blog[]) => {
                    this.blogsFollowedObserver.next(blogs);
                });
        }
    }

    addBlog(_blog: Blog) {
        //add new blog
        return this.firebaseBlogs$.push({
            name: _blog.name,
            url: _blog.url != null ? _blog.url : '',
            imageUrl: _blog.imageUrl != null ? _blog.imageUrl : '',
            followers: _blog.followers != null ? _blog.followers : 0,
            dateAdded: _blog.dateAdded != null ? _blog.dateAdded : new Date()
        }).then((item) => {
                _blog.key = item.key;
                // automatically follow added blog
                this.follow(_blog);
            });
    }

    updateBlog(_blog: Blog) {
        //update blog in db
        let value = this.angularFire.database.object('/blogs/' + _blog.key);

        return value.update({
            name: _blog.name,
            url: _blog.url != null ? _blog.url : '',
            imageUrl: _blog.imageUrl != null ? _blog.imageUrl : '',
            followers: _blog.followers != null ? _blog.followers : 0,
            dateAdded: _blog.dateAdded != null ? _blog.dateAdded : new Date().toISOString()
        });
    }

    follow(_blog: Blog) {
        if (this.firebaseUserBlogs$ !== null) {
            this.firebaseUserBlogs$.push({
                blogKey: _blog.key,
                dateAdded: new Date().toISOString()
            });
        }
    }
}
