import {provide} from 'angular2/core';

import {AuthService} from './worker/services/Auth';
import {Backend, BackendConfig} from './worker/services/Backend';

export const FIREBASE_URL = 'https://ng2-forum-demo.firebaseio.com';

export const SHARED_PROVIDERS = [
  AuthService,
  Backend,
  provide(BackendConfig, {useValue: {url: FIREBASE_URL }})
];
