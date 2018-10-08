/*
based tutorial by: Dirk Luijk
https://www.youtube.com/watch?v=KeU83fCoW10

*/


import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs'


@Directive({
  selector: '[DragDropList]'
})
export class DragDropListDirective {

  @Output() dragStart = new Subject<PointerEvent>();
  @Output() dragMove = new Subject<PointerEvent>();
  @Output() dragEnd= new Subject<PointerEvent>();

  @HostBinding('attr.touch-action') touchAction = 'none';
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @HostListener('pointerdown', ['$event']) onMouseDown(event: PointerEvent):void {  
    this.dragging = true;
    this.dragStart.next(event)
  }

  @HostListener('document:pointermove', ['$event']) onMouseMove(event: PointerEvent):void {
    if(!this.dragging)
    return;  
    this.dragMove.next(event)
  }

  @HostListener('document:pointerup', ['$event']) onMouseUp(event: PointerEvent) : void {
    if( ! this.dragging )
      return;
    this.dragging = false;
    this.dragEnd.next(event);
  }

  constructor() { }

}
