import { Injectable } from '@angular/core';
import * as Msal from 'msal';
import { UserAgentApplication, Logger, LogLevel } from 'msal';

import { configSettings } from './configsettings';
import { User } from "msal/lib-commonjs/User";

@Injectable()
export class AuthenticationService {

    private authority = `https://login.microsoftonline.com/tfp/${configSettings.tenant}/${configSettings.signUpSignInPolicy}`;

    private clientApplication: Msal.UserAgentApplication;

    constructor() {
        this.clientApplication =
            new Msal.UserAgentApplication(
                configSettings.clientID,
                this.authority,
                this.authCallback,
                {
                    redirectUri: window.location.origin
                }
            );
    }

    public login(): void {
        //sessionStorage.setItem("logged", "Yes");
        this.clientApplication.loginRedirect(configSettings.b2cScopes);
    }

    public logout(): void {
        this.clientApplication.logout();
    }

    public isOnline(): boolean {
        return this.clientApplication.getUser() != null;
    }

    public getUser(): User {
        return this.clientApplication.getUser();
    }

    public getAuthenticationToken(): Promise<string> {
        return this.clientApplication.acquireTokenSilent(configSettings.b2cScopes)
            .then(token => {
                return token;
            }).catch(error => {
                console.error('error getting accees token: ' + error);
                return Promise.resolve('');
                // return this.clientApplication.acquireTokenPopup(configSettings.b2cScopes)
                //     .then(token => {
                //         return Promise.resolve(token);
                //     }).catch(innererror => {
                //         console.error('Could not retrieve token from popup.', innererror);
                //         return Promise.resolve('');
                //     });
            });
    }

    private authCallback(errorDesc: any, token: any, error: any, tokenType: any) {
        if (error) {
            console.error(`${error} ${errorDesc}`);
        }
    }
}
