import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'question-list',
  template: `
    <div class="card" *ngFor="#question of questions">
      <h3><a [routerLink]="['QuestionDetail', {id: question.id}]">{{question.title}}</a></h3>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class QuestionList {
  @Input() questions: any[];
}
