
import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabMenuComponent } from './tab-menu.component'
import { BlogsComponent } from './blogs/blogs.component'
import { PodcastsComponent } from './podcasts/podcasts.component'

const tabMenuRoutes: Routes = [
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'podcasts',
    component: PodcastsComponent
  },
  {
    path: '',
    redirectTo: 'podcasts', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tabMenuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TabMenuRoutingModule { }