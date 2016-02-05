import {
  WORKER_RENDER_PLATFORM,
  WORKER_RENDER_APPLICATION,
  WORKER_RENDER_ROUTER,
  WORKER_SCRIPT,
  MessageBus
} from 'angular2/platform/worker_render';
import {platform, provide} from 'angular2/core';
import {BOOTSTRAP_CHANNEL} from '../shared/channels';

let appRef = platform([WORKER_RENDER_PLATFORM])
.application([
  WORKER_RENDER_APPLICATION,
  WORKER_RENDER_ROUTER,
  provide(WORKER_SCRIPT, {useValue: '/loader.js'})
]);

let bus: MessageBus = appRef.injector.get(MessageBus);
bus.initChannel(BOOTSTRAP_CHANNEL);
bus.from(BOOTSTRAP_CHANNEL).subscribe((message: string) => {
  if (message === 'done') {
    (<any> window).preboot.complete();
  }
});
