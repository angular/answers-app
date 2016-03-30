import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Nav} from '../services/Nav';
import {QuestionService} from '../services/QuestionService';
import {QuestionList} from '../components/QuestionList';
import {FirebaseAuth} from 'angularfire2';

@Component({
  selector: 'home-container',
  template: `
    <div class="card">
      <h3 *ngIf='!(auth | async)'>Recent Questions</h3>
      <h3 *ngIf='(auth | async)'>Hi {{(auth | async).github.displayName}}, here are some recent questions</h3>
    </div>
    <question-list [questions]="questionService.questions | async"></question-list>
  `,
  directives: [QuestionList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsContainer {
  constructor(private questionService:QuestionService, public auth: FirebaseAuth){}
}
