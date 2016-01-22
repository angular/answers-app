import {Component} from 'angular2/core';
import {Nav} from '../services/Nav';
import {QuestionList} from '../components/questionList'

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
  questions = [{id:1, title: 'hello world'}]
}
