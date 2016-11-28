import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs';

import 'rxjs/add/operator/switchMap';

import { Blog } from '../models/blog.model';
import { LoginService } from './login.service'
import { User } from '../models/user.model';
import { UserBlog } from '../models/userBlog.model';

@Injectable()
export class BlogService {

    public blogs$: Observable<Blog[]>;
    public blogsFollowed$: Observable<any> = Observable.from([]);

    private firebaseBlogs$: FirebaseListObservable<Blog[]>;
    private firebaseUserBlogs$: FirebaseListObservable<UserBlog[]> = null;

    constructor(private angularFire: AngularFire, private loginService: LoginService) {
        this.firebaseBlogs$ = angularFire.database.list('/blogs');
        

        this.blogs$ = this.firebaseBlogs$
            .map((fireBlogs: any) => {
                return fireBlogs.map((fireBlog: any) => new Blog(fireBlog.$key, fireBlog.name, fireBlog.url, fireBlog.imageUrl, fireBlog.followers));
            });

        loginService.user$.subscribe((user: User) => {
            if (user === null) {
                this.blogsFollowed$ = Observable.from([]);
            }
            else {
                this.firebaseUserBlogs$ = angularFire.database.list('/users/' + user.authKey + '/blogs');

                this.blogsFollowed$ = angularFire.database.list('/users/' + user.authKey + '/blogs')
                  .map(followedBlogs => {
                    return followedBlogs.map(followedBlog => {
                        angularFire.database.object('/blogs/' + followedBlog.key)
                          .subscribe(c => {
                            followedBlog = c;
                          });
                      });
                    });

/*
                this.blogsFollowed$ = angularFire.database.list('/users/' + user.authKey + '/blogs')
                    .switchMap(followedBlogs => {
                        return followedBlogs.map(followedBlog => {
                            return angularFire.database.object('/blogs/' + followedBlog.key)
                                .flatMap((value: any, index: number) => {
                                    return value as any;
                                });
                        });
                    });
*/

                /*
                                this.blogsFollowed$ = angularFire.database.list('/users/'+ user.authKey + '/blogs')
                                    .map((blogsFollowed: any[]) => {
                                        blogsFollowed.map(blogFollowed => {
                                            blogFollowed.blog = angularFire.database.object('/blogs/' + blogFollowed.$key)
                                                .flatMap((fireBlog: any) => {
                                                    blogFollowed.blog = new Blog(fireBlog.$key, fireBlog.name, fireBlog.url, fireBlog.imageUrl, fireBlog.followers);
                                                });        
                                        });
                                        return blogsFollowed;
                                    });
                                    */
                /*
                this.projects = this.af.database.list(`projects`)
                  .map(projects => {
                    return projects.map(project => {
                      project.customers.map(customer => {
                        this.af.database.list(`customers`)
                          .subscribe(c => {
                            customer = c;
                          });
                      });
                      return project;
                    });
                  });
                */

                //.subscribe((blogs : Blog[]) => { 
                //    this.blogsFollowed$.next(blogs) 
                //});

            }
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
        if(this.firebaseUserBlogs$ !== null) {
            this.firebaseUserBlogs$.push({
                blogKey: _blog.key,
                dateAdded: new Date().toISOString()
            });
        }
    }
}
