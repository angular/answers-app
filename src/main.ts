import {bootstrap} from 'angular2/platform/browser';
import {platform, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';

import {SHARED_PROVIDERS} from './shared-providers';

import {App} from './app/app';

bootstrap(App, [
	ROUTER_PROVIDERS,
  SHARED_PROVIDERS,
  provide(LocationStrategy, {useClass: PathLocationStrategy})
]);

