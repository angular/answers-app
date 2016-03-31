import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {AnswerService, Answer} from '../services/AnswerService';
import {FirebaseAuth} from 'angularfire2';

import * as Firebase from 'firebase';

@Component({
  selector: 'create-answer',
  template: `
    <div [ngSwitch]="(auth | async)" class="card">
      <span *ngSwitchWhen="null">
        <h3>You must <a (click)="auth.login()">login</a> to answer this question.</h3>
      </span>
      <span *ngSwitchDefault>
        <h3>Add Answer</h3>
        <div class="new-answer-container">
          <input type="text" placeholder="Answer Here" [(ngModel)]="newAnswer.text" />
        </div>
        <button (click)="addAnswer()">Save</button>
      </span>
    </div>
  `,
  styles: [
    `.new-answer-container {
        display: flex;
        flex-direction: column
    }`
  ]
})
export class CreateAnswer {
  @Input() questionId: string;
  newAnswer: Answer = {
    timestamp: Firebase.ServerValue.TIMESTAMP,
    text: '',
    uid: '',
    username: ''
  };

  constructor(private _answerService: AnswerService, public auth: FirebaseAuth){
    this.auth.subscribe ((authData) => {
      if (authData != null) {
        this.newAnswer.uid = authData.uid;
        this.newAnswer.username = authData.github.username;
      }
    });
  }

  addAnswer(){
   this._answerService.addAnswer(this.questionId, this.newAnswer);
   this.newAnswer.text = '';
  }
}
