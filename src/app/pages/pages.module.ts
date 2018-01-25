import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../theme/nga.module';

import { routing } from './pages.routing';
import { Pages } from './pages.component';

import { AppServerNameService } from '../../../src/assets/appservername.service';
import { CommonService } from '../helpers/common-service/common.service';

@NgModule({
  imports: [ CommonModule, NgaModule, routing ],
  declarations: [ Pages ],
  providers: [ AppServerNameService, CommonService ]
})
export class PagesModule {
}
