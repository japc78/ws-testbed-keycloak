import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private loginService: LoginService) {

  }

  public login():void {
    this.loginService.login();
  }

  public logout(): void {
    this.loginService.logout();
  }
}
