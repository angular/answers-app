import {provide} from 'angular2/core';
import {
  defaultFirebase,
  firebaseAuthConfig,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

import {AuthService} from './worker/services/Auth';
import {Backend, BackendConfig} from './worker/services/Backend';
import {QuestionService} from './worker/services/QuestionService';

export const SHARED_PROVIDERS = [
  AuthService,
  QuestionService,
  defaultFirebase('answers-mobile.firebaseio.com'),
  firebaseAuthConfig({
    method: AuthMethods.Redirect,
    provider: AuthProviders.Github
  })
];

