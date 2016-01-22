import {Component} from 'angular2/core';
import {Nav} from '../services/Nav';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'app-header',
	template: `
		<img role="tab" class="header__menu js-toggle-menu" src="/images/ic_menu_24px.svg" alt="toggle_nav" (click)="openSideNav()"/>

		<a class="header__title" [routerLink]="['Questions']">Angular Answers</a>
    <a class="header__item" [routerLink]="['CreateQuestion']">New Question</a>
	`,
  directives: [ROUTER_DIRECTIVES]
})
export class AppHeader {
	constructor(private nav: Nav){

	}
	openSideNav(){
		this.nav.open()
	}
}
