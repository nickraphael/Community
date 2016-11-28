import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { GrowlService } from './services/growl.service';
import { LoginService } from './services/login.service';
import { Growl } from './models/growl.model';
import { LoginComponent } from './login/login.component';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ngCommunity';
    user: User = null;

    growlMessages: Growl[];

    constructor(public _loginService: LoginService, private _GrowlService: GrowlService) { 
        _loginService.user$.subscribe((user: User) => {
            this.user = user;
        });
    }

    logout() {
        this._loginService.logout();
    }

}