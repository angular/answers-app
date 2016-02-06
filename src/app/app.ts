//ng2 deps
import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, AsyncRoute, ROUTER_DIRECTIVES} from 'angular2/router';

//app services
import {AuthService} from '../services/Auth';
import {Nav} from '../services/Nav';
import {QuestionService} from '../services/QuestionService';
//generic components
import {AppHeader} from '../components/header';
import {SideNav} from '../components/sidenav';
import {Toast} from '../components/toast';

//routable components
import {QuestionsContainer} from '../containers/questions';
import {QuestionDetailContainer} from '../containers/questionDetail';
import {CreateQuestionContainer} from '../containers/createQuestion';
import {About} from '../components/About';

@Component({
	selector: 'app',
	providers: [Nav],
	directives: [AppHeader, SideNav, Toast, ROUTER_DIRECTIVES],
	template: `
		<app-header class="header"></app-header>
		<main class="main js-global-main" aria-role="main">
			<router-outlet></router-outlet>
		</main>
		<toast-view #toast></toast-view>
		<side-nav></side-nav>`,
})
@RouteConfig([
	new Route({ name: 'Questions', component: QuestionsContainer, path: '/questions', useAsDefault: true }),
  new Route({ name: 'QuestionDetail', component: QuestionDetailContainer, path: '/questions/:id'}),
  new Route({ name: 'CreateQuestion', component: CreateQuestionContainer, path: '/questions/new'}),
	new Route({ name: 'About', component: About, path: '/about' })
])
export class App {
	constructor(public nav: Nav) { }

	authenticate() {
		//this.backend.authenticate()
	}
	showToast(message) { }
}
