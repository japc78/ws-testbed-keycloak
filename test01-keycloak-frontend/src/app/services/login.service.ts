import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oAuthService: OAuthService) { }

  public login():void {
    this.oAuthService.initImplicitFlowInternal();

  }

  public logout():void {
    this.oAuthService.logOut();
  }
}
