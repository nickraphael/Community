import { Component } from '@angular/core';

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

  constructor(private _GrowlService: GrowlService) {

  }

}