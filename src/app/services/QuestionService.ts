import {AngularFire, FirebaseObservable} from 'angularfire2';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import {Database, DBSchema} from './database';

const QUESTIONS_PATH = '/questions';

export const CACHED_SCHEMA: DBSchema = {
  version: 2,
  name: 'answers-app',
  stores: {
    'questions': {
      primaryKey: 'key'
    }
  }
};

class CachedQuestion {
  constructor(public _key: string, public _value: Object) {}
  
  key(): string {
    return this._key;
  }

  val(): Object {
    return this._value;
  }

  static toCache(question): Object {
    return {
      key: question.key(),
      value: question.val()
    };
  }
}

@Injectable()
export class QuestionService {
	questions:FirebaseObservable<any>;
	constructor(public db: Database, angularFire: AngularFire){
    this.questions = angularFire
      .list(QUESTIONS_PATH)
      .startWith(null)
      .switchMap((value) => {
        if (value === null) {
          return db
            .get('questions', 'cache')
            .map((value) => value ? value['data'] : '[]')
            .map((value) => JSON.parse(value))
            .map((questions) => questions.map((q) => new CachedQuestion(q.key, q.value)));
        }
        this.saveInCache(value);
        return [value];
      });
	}
  
  saveInCache(value) {
    var arr = Array.prototype.slice.call(value);
    arr = arr.map((entry) => CachedQuestion.toCache(entry));
    var toSave = {
      'key': 'cache',
      'data': JSON.stringify(arr)
    };
    this.db.insert('questions', [toSave]).subscribe();
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
