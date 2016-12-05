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

    public blogs$: ReplaySubject<Blog[]> = new ReplaySubject<Blog[]>(1);

    private rawBlogs$: Observable<Blog[]>;
    private userBlogsObserver: Observer<UserBlog[]> = null;
    private userBlogs$: Observable<UserBlog[]>

    private firebaseBlogs$: FirebaseListObservable<Blog[]>;
    private firebaseUserBlogs$: FirebaseListObservable<UserBlog[]> = null;

    constructor(private angularFire: AngularFire, private loginService: LoginService) {

        this.firebaseBlogs$ = angularFire.database.list('/blogs');

        this.userBlogs$ = new Observable<UserBlog[]>(observer => this.userBlogsObserver = observer);

        this.rawBlogs$ = this.firebaseBlogs$
            .map((fireBlogs: any) => {
                return fireBlogs.map((fireBlog: any) => new Blog(fireBlog.$key, fireBlog.name, fireBlog.url, fireBlog.imageUrl, fireBlog.followers));
            });

        this.setupMergedBlogs();

        loginService.user$.subscribe((user: User) => {
            if (user === null) {
                this.userBlogsObserver.next([]);
                //this.blogs$.next([]);
            }
            else {
                this.firebaseUserBlogs$ = this.angularFire.database.list('/users/' + user.authKey + '/blogs');

                this.angularFire.database.list('/users/' + user.authKey + '/blogs')
                    .map((fireUserBlogs: any) => {
                        return fireUserBlogs.map((fireUserBlog: any) => new UserBlog(fireUserBlog.$key, fireUserBlog.blogKey, fireUserBlog.dateAdded));
                    })
                    .subscribe((userBlogs: UserBlog[]) => {
                        this.userBlogsObserver.next(userBlogs);
                    });
            }
        });
    }

    setupMergedBlogs() {

        Observable.combineLatest(
            this.rawBlogs$,
            this.userBlogs$)
            .map((values: any[]) => {
                // look in userBlogs to see if blog has been followed
                let blogs: Blog[] = values[0];
                let userBlogs: UserBlog[] = values[1];

                return blogs.map((blog: Blog) => {
                    let filteredUserBlogs: UserBlog[] = userBlogs.filter((userBlog: UserBlog) => { return blog.key === userBlog.blogKey });
                    blog.userBlog = filteredUserBlogs.length > 0 ? filteredUserBlogs[0] : null;
                    return blog;
                })
            })
            .subscribe((blogs: Blog[]) => {
                this.blogs$.next(blogs);
            });

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
            this.follow(_blog, () => {});
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

    follow(_blog: Blog, callback: () => void) {
        // add user/blogs entry
        if (this.firebaseUserBlogs$ !== null) {
            this.firebaseUserBlogs$.push({
                blogKey: _blog.key,
                dateAdded: new Date().toISOString()
            }).then(_ => {
                // update blog entry to increment follow
                _blog.followers++;
                this.updateBlog(_blog);

                callback();
            });
        }
    }

    unfollow(_blog: Blog, callback: () => void) {
        // delete user/blogs entry
        let nodeToDelete = this.angularFire.database.object('/users/' + this.loginService.user.authKey + '/blogs/' + _blog.userBlog.firebaseKey);
        nodeToDelete.remove().then(_ => {
            // update blog entry to increment follow
            _blog.followers--;
            this.updateBlog(_blog);

            callback();
        });
    }
}
