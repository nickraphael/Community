import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LoginService } from '../services/login.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isVisible: boolean = false;

    constructor(private _loginService: LoginService) {
        
    }

    ngOnInit() {
    }

    openLoginPage() {
        this.isVisible = true;
    }

    onBeforeHide() {
        this.isVisible = false;
    }

    googleClick() {
        this._loginService.login('google');
    }



}
