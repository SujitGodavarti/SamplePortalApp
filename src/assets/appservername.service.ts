import { Injectable } from '@angular/core';
import { Config } from './appconfig';

@Injectable()
export class AppServerNameService {
  public _serverName: string;
  public emailResetLink: string;
  result: any;

  constructor() {
    this.setServerName();
  }

  setServerName() {
    if (localStorage.getItem("serverName")) {
      this._serverName = localStorage.getItem("serverName");
    }
    else {
      if (window.location.origin == Config.Origins[0]["Dev"]) {
        this._serverName = Config.Servers[0]["Dev"];
      }
    }
  }
}