import {provide} from 'angular2/core';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

import {AuthService} from './worker/services/Auth';
import {Backend, BackendConfig} from './worker/services/Backend';
import {QuestionService} from './worker/services/QuestionService';


export const SHARED_PROVIDERS = [
  AuthService,
  QuestionService,
  FIREBASE_PROVIDERS,
  defaultFirebase('answers-mobile.firebaseio.com')
];
