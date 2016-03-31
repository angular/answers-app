import {Directive, OnInit, OnDestroy, ElementRef} from 'angular2/core';
import {CKEditorRenderer} from '../../shared/ckeditor_renderer';

@Directive ({
  selector: '[ckeditor]',
  providers: [CKEditorRenderer]
})
export class CKEditorDirective implements OnInit, OnDestroy {
  constructor(private _renderer: CKEditorRenderer, private _elem: ElementRef) {}

  ngOnInit() {
    this._renderer.init(this._elem);
  }

  ngOnDestroy() {
    console.log("destroying", this._elem);
    // TODO: There is a race with destroy where the element can be removed from the
    // store (I believe only on the render side) before the destroy method has executed there.
    //this._renderer.destroy(this._elem);
  }
}
