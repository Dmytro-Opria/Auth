import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth{
    lock = Auth0Lock('lb3513rLAgMWsrVEVaOSNgAV2Qx6BoQA', 'dimasangular.eu.auth0.com', {});

    constructor(){
        this.lock.on("authenticated", (authResult: any) =>{
            this.lock.getProfile(authResult.idToken, function (error:any, profile:any) {
                if(error){
                    throw new Error(error);
                }
                //Set Profile
                localStorage.setItem('profile', JSON.stringify(profile));
                //Set Token
                localStorage.setItem('id_token', authResult.idToken);
            })
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public authenticated(){
        return tokenNotExpired();
    }

    public logout() {
        // Remove info from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}

