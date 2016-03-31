import {Component} from 'angular2/core';
import {QuestionService} from '../services/QuestionService';
import {Router, RouteConfig} from 'angular2/router'
import {FirebaseAuth} from 'angularfire2';
import {CKEditorDirective} from '../directives/ckeditor_directive';

@Component({
  selector: 'create-question-container',
  template: `
    <div [ngSwitch]="(auth | async)" class="card">
      <span *ngSwitchWhen="null">
        <h3>Please <a (click)="auth.login()">login</a> to continue.</h3>
      </span>
      <span *ngSwitchDefault>
        <h3>Ask a new question</h3>
        <div class="new-question-container">
         
          <input type="text" placeholder="Question Title" [(ngModel)]="newQuestion.title"/>
          <textarea ckeditor placeholder="Ask your Question Here" (change)="questionTextChanged($event.target.value)"></textarea>
       
        </div>
        <button (click)="addQuestion()">Save</button>
      </span>
    </div>
  `,
  styles: [
    `.new-question-container {
        display: flex;
        flex-direction: column
    }`
  ],
  directives: [CKEditorDirective]
})
export class CreateQuestionContainer {
  newQuestion: any = {};
  constructor(private questionService:QuestionService, private router:Router,
              public auth: FirebaseAuth) {}
  addQuestion() {
   this.questionService.addQuestion(this.newQuestion);
   this.router.navigate(['../Questions']);
  }

  questionTextChanged(val: string) {
    this.newQuestion.text = val;
  }
}
