import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models/user.model';

type loginProvider =
    "google";

@Injectable()
export class LoginService {

    public user$: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(private _angularFire: AngularFire) {
        this._angularFire.auth.subscribe(auth => {
            console.log('auth:');
            console.log(auth);

            if (auth != null) {
                //logged in
                let user: User = new User();  
                user.authKey = auth.auth.uid;      
                user.displayName = auth.auth.displayName;
                user.photoUrl = auth.auth.photoURL;

                this.RegisterUserIfNeeded(user);

                this.user$.next(user);                
            }
            else {
                // logged out
                this.user$.next(null);
            }            
        });
    }

    login(provider: loginProvider) {
        let loginAuth: any;

        switch (provider) {
            case 'google':
                loginAuth = {
                    provider: AuthProviders.Google,
                    method: AuthMethods.Redirect,
                };
                break;
        
            default:
                break;
        }

        this._angularFire.auth.login(loginAuth)
    }

    logout() {
        this._angularFire.auth.logout();
    }

    RegisterUserIfNeeded(user: User) {
        //check if user if in db
        this._angularFire.database.object('/users/' + user.authKey)
            .subscribe((existingUser: any) => {
                if(!existingUser.$exists()) {
                    this._angularFire.database.list('/users').push({
                        authKey: user.authKey,
                        displayName: user.displayName,
                        photoURL: user.photoUrl,
                        dateAdded: new Date().toISOString()
                    });
                }
            });
    }

}
