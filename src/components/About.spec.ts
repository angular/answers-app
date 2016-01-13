import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
  TestComponentBuilder
} from 'angular2/testing';

import {About} from './About';

describe('About', () => {
  beforeEachProviders(() => []);


  it('should have About text', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb.createAsync(About)
      .then(fixture => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toContain('About');
      });
  }));
});
