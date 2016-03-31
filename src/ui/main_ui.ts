import {
  WORKER_RENDER_PLATFORM,
  WORKER_RENDER_APPLICATION,
  WORKER_RENDER_ROUTER,
  WORKER_SCRIPT,
  MessageBus
} from 'angular2/platform/worker_render';
import {platform, provide} from 'angular2/core';
import {BOOTSTRAP_CHANNEL} from '../shared/channels';
import {CKEditorRenderer} from '../shared/ckeditor_renderer';
import {
  defaultFirebase,
} from 'angularfire2';
import {WORKER_RENDER_FIREBASE_PROVIDERS} from 'angularfire2/angularfire2_worker_render';
// Need to import from providers directly 
// until https://github.com/angular/angularfire2/pull/111 is merged
import {MessageBasedFirebaseAuth} from 'angularfire2/providers/web_workers/ui/auth';

let appRef = platform([WORKER_RENDER_PLATFORM])
.application([
  WORKER_RENDER_FIREBASE_PROVIDERS,
  defaultFirebase('answers-mobile.firebaseio.com'),
  WORKER_RENDER_APPLICATION,
  WORKER_RENDER_ROUTER,
  CKEditorRenderer,
  provide(WORKER_SCRIPT, {useValue: '/loader.js'})
]);

let bus: MessageBus = appRef.injector.get(MessageBus);
bus.initChannel(BOOTSTRAP_CHANNEL);
bus.from(BOOTSTRAP_CHANNEL).subscribe((message: string) => {
  if (message === 'done') {
    (<any> window).preboot.complete();
  }
});

// Need to manually call start until https://github.com/angular/angular/issues/7420 is implemented
appRef.injector.get(MessageBasedFirebaseAuth).start();
appRef.injector.get(CKEditorRenderer).ngStartListening();
