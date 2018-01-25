import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions } from '@angular/http';

import { AppServerNameService } from '../../../../src/assets/appservername.service';

import { AuthenticationService } from '../../shared/msal/authentication.service';
import { ApiRequest } from '../api-request/api-request';

// Common enums which can be used across multiple modules. If enum is declared in one component and imported into a component in another module, several instances of one component are instantiated instead of one.

export enum accountType {
    CLIENT = 0,
    STORE = 1,
    COMPANY = 2,
    GROUP = 3,
};

export enum provisionDateType {
    TOMORROW = 1,    
    DATE = 2,
    NOW = 3,        
};

export enum messageType {
    SUCCESS = 1,
    WARNING = 2,
}

export enum dropdownType {
    DETAILS = 1, 
    LOCK = 2,
    UNLOCK = 3,
    PACKAGES = 4,
    PROVISION = 5,
    TASKS = 6,
    DELETE = 7,
    RESET_PASSWORD = 8,
}

export enum confirmationDialogType {
    DELETE_ACCOUNT = 1, // This corresponds to deleting an account
    UNLOCK_CLIENT = 2,  // This corresponds to unlocking client(s)
    UNLINK_CONTACT = 3, // This corresponds to unlinking a contact from account
    CONFIG_PACKAGE = 4, // This corresponds to configuring a package for the client
    REMOVE_PACKAGE = 5, // This corresponds to removing a package for the client
    AUTH_EXPIRED = 6,    // Authentication token has expired
}

// This is a common service which can be used across multiple modules. Its dependency is injected in pages.module.ts file so that only one instance of this service is created
@Injectable()
export class CommonService {
    private apiRequest: ApiRequest;

    constructor(private appServerNameService: AppServerNameService,
        private http: Http,
        private authService: AuthenticationService) {    
            this.apiRequest = new ApiRequest(appServerNameService, this.authService);        
    }

    searchContacts(searchText: string, pageNo: number, pageSize: number): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'contacts/search?queryString=' + searchText + '&pageNo=' + pageNo + '&pageSize=' + pageSize);
        return this.makeAPICall(requestoptions);
    }

    getSearchResults(searchText: string, pageNo: number, pageSize: number): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Accounts/search?queryString=' + searchText + '&pageNo=' + pageNo + '&pageSize=' + pageSize);
        return this.makeAPICall(requestoptions);
    }

    linkAccount(accountId: number, accountTypeId: number, contactId: number): any {
        var strRequest = "";

        if (accountTypeId == accountType.GROUP) {
            strRequest = 'CustomerGroups/' + accountId + '/contact/' + contactId;
        }

        if (accountTypeId == accountType.COMPANY) {
            strRequest = 'Customers/' + accountId + '/contact/' + contactId;
        }

        if (accountTypeId == accountType.STORE) {
            strRequest = 'Stores/' + accountId + '/contact/' + contactId;
        }

        let requestoptions = new RequestOptions();
        requestoptions = this.apiRequest.makeRequest(RequestMethod.Put, strRequest);
        return this.makeAPICall(requestoptions);

    }
    
    getContactTypes(): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'ContactTypes');
        return this.makeAPICall(requestoptions);
    }

    getBanks(): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Banks');
        return this.makeAPICall(requestoptions);
    }

    getAccountsByContactId(contactId: number, pageNumber: number = 1, pageSize: number = 10): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Accounts/bycontactid?contactId=' + contactId + '&pageNo=' + 1 + '&pageSize=' + pageSize);
        return this.makeAPICall(requestoptions);
    }

    getClient(clientId: number): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Clients/' + clientId);
        return this.makeAPICall(requestoptions);
    }

    getTaskStatuses(): any {
        var requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Tasks/statuses');
        return this.makeAPICall(requestoptions);
    }
    
    // Provisioning
    getProvisioningInfo(accountId: number, accountTypeId: number): any {
        let requestoptions = null;

        if(accountTypeId == accountType.CLIENT) {
            requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Clients/' + accountId + '/provisioninginfo');
        }
        if(accountTypeId == accountType.STORE) {
            requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Stores/' + accountId + '/provisioninginfo');
        }
        else if(accountTypeId == accountType.COMPANY) {
            requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'Customers/' + accountId + '/provisioninginfo');
        }
        else if(accountTypeId == accountType.GROUP) {
            requestoptions = this.apiRequest.makeRequest(RequestMethod.Get, 'CustomerGroups/' + accountId + '/provisioninginfo');
        }

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

    resetToken() {
        //this.authService.resetToken();        
    }
}
