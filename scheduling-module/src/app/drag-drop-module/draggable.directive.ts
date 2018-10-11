/*
based on tutorial by: Dirk Luijk
https://www.youtube.com/watch?v=KeU83fCoW10
https://stackblitz.com/edit/draggable-part-5
*/


import { Directive, HostBinding, HostListener, Output, ElementRef , forwardRef} from '@angular/core';
import { Subject } from 'rxjs'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}


@Directive({
  selector: '[Draggable]',
  
})
export class DraggableDirective {

  public position: Position = {x: 0, y: 0};
  public startPosition: Position;
  // container sortable list - subscribes to these events
  @Output() dragStart = new Subject<PointerEvent>();
  @Output() dragMove = new Subject<PointerEvent>();
  @Output() dragEnd= new Subject<PointerEvent>();

  @HostBinding('attr.touch-action') touchAction = 'none';
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      ` translateY(${this.position.y}px)`
    );
  }

  

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

  /* expose the ElementRef as a public property, so the container ( sortable-list component)
  can  use it */
  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    
  }

  ngAfterContentInit() {
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.startPosition = {x:rect.left, y:rect.top}
  }
}
