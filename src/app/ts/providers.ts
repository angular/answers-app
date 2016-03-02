import {provide} from 'angular2/core';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

import {AuthService} from '../services/Auth';
import {Backend, BackendConfig} from '../services/Backend';
import {QuestionService, CACHED_SCHEMA} from '../services/QuestionService';
import {DB_PROVIDERS, provideDB} from '../services/database';

export const SHARED_PROVIDERS = [
  AuthService,
  QuestionService,
  FIREBASE_PROVIDERS,
  DB_PROVIDERS,
  provideDB(CACHED_SCHEMA),
  defaultFirebase('answers-mobile.firebaseio.com')
];
