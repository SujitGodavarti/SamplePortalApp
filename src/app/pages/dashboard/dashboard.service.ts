import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { URLSearchParams } from '@angular/http';

import { AppServerNameService } from '../../../../src/assets/appservername.service';

import { ApiRequest } from '../../helpers/api-request/api-request';
import { AuthenticationService } from '../../shared/msal/authentication.service';

@Injectable()
export class DashboardService {
    private apiRequest: ApiRequest;

    constructor(private appServerNameService: AppServerNameService,
        private http: Http,
        private authService: AuthenticationService) {
            this.apiRequest = new ApiRequest(appServerNameService, authService);        
    }
    
    getSearchHistory(numberOfItems: number = 10): any {
        var apiCallString = 'History/accounts/searchqueries?pageNo=1&pageSize=' + numberOfItems;
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, apiCallString);
        return this.makeAPICall(requestoptions);
    }

    getFailedTasks(rescheduleTypes: string): any {
        let params: URLSearchParams = new URLSearchParams();        
        params.set('taskStatusIds', rescheduleTypes);            
        params.set('pageNo', '1');
        params.set('pageSize', '20');

        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Tasks/search');        
        requestoptions.search = params;
        return this.makeAPICall(requestoptions);
    }

    makeAPICall(requestoptions: any) {
        return this.http.request(new Request(requestoptions))
            .map(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('This request has failed' + response);
                }
                else {
                    return response.json();
                }
            });
    }
}
