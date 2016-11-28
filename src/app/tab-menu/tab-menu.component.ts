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
            {label: 'Followed', icon: 'fa-bar-chart', routerLink: ['/following']},
            {label: 'Blogs', icon: 'fa-bar-chart', routerLink: ['/blogs']}
        ];
    }

}
