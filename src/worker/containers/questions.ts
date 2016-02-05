import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Nav} from '../services/Nav';
import {QuestionService} from '../services/QuestionService';
import {QuestionList} from '../components/QuestionList'

@Component({
  selector: 'home-container',
  template: `
    <div class="card">
      <h3>Recent Questions</h3>
    </div>
    <question-list [questions]="questionService.questions | async"></question-list>
  `,
  directives: [QuestionList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsContainer {
  constructor(private questionService:QuestionService){}
}
