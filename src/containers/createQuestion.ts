import {Component} from 'angular2/core';
import {QuestionService} from '../services/QuestionService';
import {Router, RouteConfig} from 'angular2/router'

@Component({
  selector: 'create-question-container',
  template: `
    <div class="card">
      <h3>Ask a new question</h3>
      <div class="new-question-container">
       
        <input type="text" placeholder="Question Title" [(ngModel)]="newQuestion.title"/>
        <textarea placeholder="Ask your Question Here" [(ngModel)]="newQuestion.text"></textarea>
     
      </div>
      <button (click)="addQuestion()">Save</button>
    </div>

  `,
  styles: [
    `.new-question-container {
        display: flex;
        flex-direction: column
    }`
  ]
})
export class CreateQuestionContainer {
  newQuestion = {};
  constructor(private questionService:QuestionService, private router:Router){}
  addQuestion(){
   this.questionService.addQuestion(this.newQuestion);
   this.router.navigate(['../Questions']);
  }
}
