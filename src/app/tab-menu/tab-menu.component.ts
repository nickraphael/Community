import { Component, OnInit } from '@angular/core';
import { TabMenuRoutingModule } from './tab-menu-routing.module'

import {TabMenu, MenuItem} from 'primeng/primeng';

import { LoginService } from '../services/login.service'
import { User } from '../models/user.model'

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  private items: MenuItem[];
  private user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
        this.items = [
            {label: 'Followed', icon: 'fa-bar-chart', routerLink: ['/following']},
            {label: 'Blogs', icon: 'fa-bar-chart', routerLink: ['/blogs']}
        ];

        this.loginService.user$
            .subscribe((user: User) => {
                this.items[0].disabled = user == null;
            });
    }

}
