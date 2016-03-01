import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

const QUESTIONS_PATH = '/questions';

@Injectable()
export class QuestionService {
	questions:FirebaseListObservable<any>;
	constructor(angularFire: AngularFire){
    this.questions = angularFire.list(QUESTIONS_PATH, {preserveSnapshot: true});
	}
  getQuestionById(id:string){
    return this.questions
      .map(questionList => questionList.find(q => q.key() == id))
      .filter(v => v)
      .map(v => v.val());
  }
  addQuestion(newQuestion:any){
    this.questions.add(newQuestion);
  }
	authenticate(){
	}
}
