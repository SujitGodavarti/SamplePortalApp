import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//import { AuthenticationGuard } from './shared/adal/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
