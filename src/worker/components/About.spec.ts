import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
  setBaseTestProviders,
  TestComponentBuilder,
} from 'angular2/testing';

import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';

import {About} from './About';

describe('About', () => {
  it('should have About text', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb.createAsync(About)
      .then(fixture => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toContain('About');
      });
  }));
});
