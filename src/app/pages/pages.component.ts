import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { AuthenticationService } from '../shared/msal/authentication.service';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top (logout)='onLogout($event)'></ba-page-top>
    <div class="al-main">
      <div class="al-content">

        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="https://pceftpos.com">PC-EFTPOS</a> 2017</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private menuService: BaMenuService, 
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }

  onLogout(event) {
    this.authService.logout();
  }
}

