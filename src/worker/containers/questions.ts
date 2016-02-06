import {Component} from 'angular2/core';
import {Nav} from '../services/Nav';
import {Backend} from '../services/Backend'
import {QuestionList} from '../components/QuestionList'
import {Data} from '../services/Data';

@Component({
  selector: 'home-container',
  template: `
    <div class="card">
      <h3>Recent Questions</h3>
    </div>
    <question-list [questions]="questions"></question-list>
  `,
  directives: [QuestionList]
})
export class QuestionsContainer {
  questions;
  constructor(private backend:Backend){
    this.questions = [];
  }
}
