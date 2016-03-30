import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Nav} from '../services/Nav';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FirebaseAuth} from 'angularfire2';

@Component({
	selector: 'app-header',
	template: `
		<img role="tab" class="header__menu js-toggle-menu" src="/images/ic_menu_24px.svg" alt="toggle_nav" (click)="openSideNav()"/>

		<a class="header__title" [routerLink]="['Questions']">Angular Answers</a>
    <a class="header__item" *ngIf="!(auth | async)" (click)="login()">Login</a>
    <a class="header__item" *ngIf="auth | async" (click)="logout()">Logout</a>
    <a class="header__item" [routerLink]="['CreateQuestion']">New Question</a>
	`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES]
})
export class AppHeader {
	constructor(private nav: Nav, public auth: FirebaseAuth){
    this.auth.subscribe((data) => {
      console.log('auth data', data);
    });
	}
	openSideNav(){
		this.nav.open()
	}

  login() {
    this.auth.login()
    .then(() => console.log("Success!"),
          (err) => console.error(err));
  }

  logout() {
    this.auth.logout();
  }
}
