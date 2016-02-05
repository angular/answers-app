import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'question-list',
  template: `
    <div class="card" *ngFor="#question of questions">
      <h3><a [routerLink]="['QuestionDetail', {id: question.key() }]">{{ question.val().title }}</a></h3>
      <p>{{ question.val().text }}</p>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class QuestionList {
  @Input() questions: any[];
}
