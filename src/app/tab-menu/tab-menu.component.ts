import { Component, OnInit } from '@angular/core';
import { TabMenuRoutingModule } from './tab-menu-routing.module'

import {TabMenu, MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  private items: MenuItem[];

  constructor() { }

  ngOnInit() {
        this.items = [
            {label: 'Blogs', icon: 'fa-bar-chart', routerLink: ['/blogs']},
            {label: 'Podcasts', icon: 'fa-calendar', routerLink: ['/podcasts']},
            {label: 'Twitterers', icon: 'fa-twitter'},
            {label: 'GitHubs', icon: 'fa-support'},
            {label: 'Books', icon: 'fa-book'}
        ];
    }

}
