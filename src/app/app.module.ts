
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ButtonModule, TabMenuModule, DataScrollerModule, PanelModule, DialogModule, GrowlModule } from 'primeng/primeng';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { CustomFormsModule } from 'ng2-validation'
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angular2DataTableModule } from 'angular2-data-table';

import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app-routing.module';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { TabMenuRoutingModule } from './tab-menu/tab-menu-routing.module';
import { BlogsComponent } from './tab-menu/blogs/blogs.component';
import { PodcastsComponent } from './tab-menu/podcasts/podcasts.component';
import { EditBlogComponent } from './tab-menu/blogs/edit-blog/edit-blog.component';
import { BlogService } from './services/blog.service';
import { GrowlService } from './services/growl.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { FollowingComponent } from './tab-menu/following/following.component';
import { BlogListComponent } from './tab-menu/blogs/blog-list/blog-list.component';

export const firebaseConfig = {
    apiKey: "AIzaSyB69Vk-VszeZWpisLcqzZ3FLRVCSdk8Xrg",
    authDomain: "community-d8f93.firebaseapp.com",
    databaseURL: "https://community-d8f93.firebaseio.com",
    storageBucket: "community-d8f93.appspot.com",
    messagingSenderId: "106766101224"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    BlogsComponent,
    PodcastsComponent,
    EditBlogComponent,
    LoginComponent,
    FollowingComponent,
    BlogListComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    Angular2DataTableModule,
    CustomFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    AppRoutingModule,
    TabMenuRoutingModule,
    TabMenuModule,
    DataScrollerModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    GrowlModule,
    ReactiveFormsModule,
    FlexLayoutModule.forRoot()
  ],
  providers: [AngularFireModule, BlogService, GrowlService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }