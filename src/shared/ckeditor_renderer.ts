import {RenderService} from './render_service';
import {Injectable, ElementRef, Injector} from 'angular2/core';

declare var CKEDITOR: any;

@RenderService({
  methods: [{
    name: 'init',
    args: [ElementRef],
    returnType: boolean
  }, {
    name: 'destroy',
    args: [ElementRef]
  }]
})
@Injectable()
export class CKEditorRenderer {
  private _editors = new Map<ElementRef, any>();
  // NB: For now all RenderServices MUST have a public injector member
  // This is used by the RenderService annotation to inject things like the the MessageBroker
  constructor (public injector: Injector) {}
  init (elem): Promise<boolean> {
    let editor = CKEDITOR.replace(elem);
    editor.on("change", (e) => {
      elem.value = e.editor.getData();
      let event = new Event('change');
      elem.dispatchEvent(event);
    });
    this._editors.set(elem, editor);
  }

  destroy(elem) {
    let editor = this._editors.get(elem);
    editor.destroy();
    this._editors.delete(elem);
  }
}
