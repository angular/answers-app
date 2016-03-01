import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {QuestionService} from '../services/QuestionService';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'question-detail-container',
  template: `
    <div class="card">
      <h3>{{ (question | async)?.title }}</h3>
      <p>{{ (question | async)?.text }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionDetailContainer {
  question: any;
  constructor(private questionService:QuestionService, params:RouteParams){
    this.question = questionService.getQuestionById(params.get('id'));
  }
}
