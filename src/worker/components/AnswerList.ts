import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Answer} from '../services/AnswerService';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'];

@Component({
  selector: 'answer-list',
  template: `
    <div class="card" *ngFor="#answer of answers">
      <p>{{ answer.text }}</p>
      <p class='username'>Answered by {{ answer.username }} on {{ timestampToDate (answer.timestamp) }}.</p>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  styles: [`
    .username {
      font-size: 12pt;
      text-align: right;
    }
  `]
})
export class AnswerList {
  @Input() answers: Answer[];

  timestampToDate (timestamp: number): string {
    let date = new Date(timestamp);
    let month = months[date.getMonth()];
    return `${month} ${date.getDate()}`;
  }
}
