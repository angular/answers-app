import {bootstrap} from "angular2/platform/browser";
import {platform, provide, ComponentRef, Injector} from 'angular2/core';
import {APP_BASE_HREF} from 'angular2/router';
import {BOOTSTRAP_CHANNEL} from './channels';
import {SHARED_PROVIDERS} from './providers';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app';
bootstrap(App, [
  provide(APP_BASE_HREF, {useValue: '/'}),
  SHARED_PROVIDERS,
  ROUTER_PROVIDERS
]);
