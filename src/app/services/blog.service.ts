import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs';

import 'rxjs/add/operator/switchMap';

import { Blog } from '../models/blog.model';
import { LoginService } from './login.service'
import { User } from '../models/user.model';

@Injectable()
export class BlogService {

    public blogs$: Observable<Blog[]>;
    public blogsFollowed$: Observable<Blog[]>;

    private firebaseBlogs$: FirebaseListObservable<Blog[]>;

    constructor(private angularFire: AngularFire, private loginService: LoginService) {
        this.firebaseBlogs$ = angularFire.database.list('/blogs');

        this.blogs$ = this.firebaseBlogs$
            .map((fireBlogs: any) => {
                return fireBlogs.map((fireBlog: any) => new Blog(fireBlog.$key, fireBlog.name, fireBlog.url, fireBlog.imageUrl, fireBlog.followers));
            });

        loginService.user$.subscribe((user: User) => {
            if (user === null) {
                this.blogsFollowed$ = null;
            }
            else {

                this.blogsFollowed$ = angularFire.database.list('/users/'+ user.authKey + '/blogs')
                    .map((blogsFollowed: any[]) => {
                        blogsFollowed.map(blogFollowed => {
                            blogFollowed.blog = angularFire.database.object('/blogs/' + blogFollowed.$key)
                                .subscribe((fireBlog: any) => {
                                    blogFollowed.blog = new Blog(fireBlog.$key, fireBlog.name, fireBlog.url, fireBlog.imageUrl, fireBlog.followers);
                                });        
                        });
                        return blogsFollowed;
                    });
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
        return this.firebaseBlogs$.push(this.getDbObjectFromBlog(_blog));
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

    follow() {

    }
}
