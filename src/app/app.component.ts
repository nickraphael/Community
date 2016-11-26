import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { GrowlService } from './services/growl.service';
import { Growl } from './models/growl.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ngCommunity';

    growlMessages: Growl[];

    constructor(public _angularFire: AngularFire, private _GrowlService: GrowlService) { 
        this._angularFire.auth.subscribe(auth => console.log(auth));
    }

    login() {
        this._angularFire.auth.login()
        .then(value => {
            let d = value;
        })
        .catch(error => {
            let hj = error;
        })
    }

    logout() {
        let y = this._angularFire.auth.logout();
    }

}