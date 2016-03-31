import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Injectable} from 'angular2/core';
const ANSWERS_PATH = '/answers';

@Injectable()
export class AnswerService {
  private _answersList: {[key: string]: FirebaseListObservable<any>} = {};

  constructor (private _angularFire: AngularFire) {}

  getAnswersByQuestionId(id:string) {
    return this._lookupByQuestionId (id)
      .map(l => l.map(v => v.val()));
  }

  addAnswer(questionId: string, newAnswer: any) {
    this._lookupByQuestionId(questionId).add(newAnswer);
  }

  private _lookupByQuestionId(id: string): FirebaseListObservable<any> {
    let observable: FirebaseListObservable<any> = null;
    if (this._answersList[id])
      observable = this._answersList[id];
    else {
      observable = this._angularFire.list(ANSWERS_PATH + `/${id}`, {preserveSnapshot: true});
      this._answersList[id] = observable;
    }
    return observable;
  }
}

export interface Answer {
  text: string;
  uid: string;
  timestamp: number;
  username: string;
}
