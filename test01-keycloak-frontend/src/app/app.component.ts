import { Component } from '@angular/core';
import { AuthConfig, OAuthService, NullValidationHandler  } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'test01-keycloak-frontend';

  constructor(private oAuthService: OAuthService) {
    this.configure();
   }

  authConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'http://localhost:6080/realms/testbed-realm',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: 'test01-frontend',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid profile email offline_access',

    showDebugInformation: true,
  };

  configure(): void {
    this.oAuthService.configure(this.authConfig);
    this.oAuthService.tokenValidationHandler = new NullValidationHandler();
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocument()
      .then(() => this.oAuthService.tryLogin())
      .then(()=> {
        if (this.oAuthService.getIdentityClaims()) {
          this.isAdmin();
        }
      });
  }

  public isLogged(): boolean {
    return (this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidAccessToken());
  }

  public isAdmin(): boolean {
    const token = this.oAuthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);

    // console.log(payloadDecoded);
    // console.log(payloadDecoded.realm_access.roles.includes('realm-admin'))

    return payloadDecoded.realm_access.roles.includes('realm-admin');
  }

}
