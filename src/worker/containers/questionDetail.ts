import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {QuestionService} from '../services/QuestionService';
import {RouteParams} from 'angular2/router';
import {AnswerList} from '../components/AnswerList';
import {CreateAnswer} from '../components/CreateAnswer';
import {AnswerService} from '../services/AnswerService';

@Component({
  selector: 'question-detail-container',
  template: `
    <div class="card">
      <h3>{{ (question | async)?.title }}</h3>
      <p>{{ (question | async)?.text }}</p>
    </div>
    <answer-list [answers]="answers | async"></answer-list>
    <create-answer [questionId]="id"></create-answer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [AnswerList, CreateAnswer]
})
export class QuestionDetailContainer {
  question: any;
  id: string;
  answers: any;

  constructor(private _questionService:QuestionService, private _answerService: AnswerService,
              params:RouteParams){
    this.id = params.get('id');
    this.question = this._questionService.getQuestionById(this.id);
    this.answers = this._answerService.getAnswersByQuestionId(this.id);
  }
}
