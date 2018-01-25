import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Pages } from './pages.component';

//import { AuthenticationGuard } from '../shared/adal/authentication.guard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: './dashboard/dashboard.module#DashboardModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

