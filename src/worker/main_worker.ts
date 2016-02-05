import {
  WORKER_APP_PLATFORM,
  WORKER_APP_APPLICATION,
  WORKER_APP_ROUTER,
  MessageBus
} from "angular2/platform/worker_app";
import {platform, provide, ComponentRef, Injector} from 'angular2/core';
import {APP_BASE_HREF} from 'angular2/router';
import {BOOTSTRAP_CHANNEL} from '../shared/channels';
import {SHARED_PROVIDERS} from '../shared-providers';

import {App} from './app/app';

platform([WORKER_APP_PLATFORM])
.asyncApplication(null, [
  WORKER_APP_ROUTER,
  WORKER_APP_APPLICATION,
  provide(APP_BASE_HREF, {useValue: '/'}),
  SHARED_PROVIDERS
]).then((appRef) => appRef.bootstrap(App).then((compRef: ComponentRef) => {
  // TODO(jteplitz602): Fix #31 and remove this timeout hack
  // We need it right now because bootstrap's promise resolves before all compRef render calls
  // have been made.
  setTimeout(() => {
    let bus: MessageBus = compRef.injector.get(MessageBus);
    // runInZone is false since we're not in the ng zone here
    bus.initChannel(BOOTSTRAP_CHANNEL, false);
    bus.to(BOOTSTRAP_CHANNEL).emit('done');
  }, 1);
}));
