import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';

import { Growl } from '../models/growl.model';

@Injectable()
export class GrowlService {

    messages: Message[] = [];

    constructor() { }

    addGrowl(message: Growl){
        this.messages.push(message);
    }

}
