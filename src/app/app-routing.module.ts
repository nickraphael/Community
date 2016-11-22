
import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabMenuComponent } from './tab-menu/tab-menu.component'


const appRoutes: Routes = [
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}