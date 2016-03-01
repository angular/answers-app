import {provide} from 'angular2/core';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

import {AuthService} from '../services/Auth';
import {Backend, BackendConfig} from '../services/Backend';
import {QuestionService} from '../services/QuestionService';


export const SHARED_PROVIDERS = [
  AuthService,
  QuestionService,
  FIREBASE_PROVIDERS,
  defaultFirebase('answers-mobile.firebaseio.com')
];
