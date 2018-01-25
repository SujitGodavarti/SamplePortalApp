import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router'

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { DashboardService } from './dashboard.service';
import { CommonService } from '../../helpers/common-service/common.service';
import { TaskStatus } from '../../models/task-status';
declare var require: any;

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
})

export class DashboardComponent {

    private unsubscribe: Subject<void> = new Subject<void>();

    @ViewChild('errorModal') errorModal: TemplateRef<any>;
    errorDialog: NgbModalRef | null;
    strRescheduleStatus: string;

    constructor(private dashboardService: DashboardService,
        private commonService: CommonService,
        private router: Router,
            ) {       
    }

    ngOnInit(): void {
        this.commonService.getTaskStatuses()
            .takeUntil(this.unsubscribe)
            .subscribe(
            statuses => this.assignStatusesandGetFailedTasks(statuses["data"])
           );
    }


    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();    
    }   

    assignStatusesandGetFailedTasks(statuses: TaskStatus[]) {
        for (var i = 0; i < statuses.length; i++) {
            if (statuses[i].canReschedule) {
                this.strRescheduleStatus = statuses[i].id.toString();
            }
        }
    }    

}
