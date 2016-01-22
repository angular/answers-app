import {Backend} from './Backend';
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Rx';

export interface Question {}
export interface Answer {}
export interface User {}

export class Data {

  constructor(private backend:Backend){}
  recentQuestions: Observable<Question[]>;

  createQuestion(question:Question){}
}
