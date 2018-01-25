import { Headers, RequestOptions, Request, URLSearchParams } from '@angular/http';
import { AppServerNameService } from '../../../../src/assets/appservername.service';
import { AuthenticationService } from '../../shared/msal/authentication.service';

// Common request-createor
// Implemented as a class, not a service
export class ApiRequest {
    private serverName = this.appServerNameService._serverName;
    private token: string;
    private isLoggedIn: boolean = true;

    constructor(private appServerNameService: AppServerNameService, 
                private authService: AuthenticationService) {
    }

    assignIsLoggedIn(isLogged: boolean) {
        this.isLoggedIn = isLogged
    }

    assignToken(token: string) {
        this.token = token;
        console.log(this.token);
    }

    makeRequest(method: number, uri: string, body: any = null): RequestOptions {
        // this.authService.isLoggedIn()
        //     .subscribe(logged => this.assignIsLoggedIn(logged));

        if (this.isLoggedIn) {
            this.authService.getAuthenticationToken()
                .then(token => this.assignToken(token));

            

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + this.token);
            let requestoptions = new RequestOptions()
            requestoptions.headers = headers;

            requestoptions.method = method, requestoptions.url = this.serverName + uri;

            if (body != null) {
                requestoptions.body = JSON.stringify(body);
            }
            return requestoptions;
        }
        else {
            this.authService.login();
        }

    }

}
