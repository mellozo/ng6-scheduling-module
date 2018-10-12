/*
based on tutorial by: Dirk Luijk
https://www.youtube.com/watch?v=KeU83fCoW10
https://stackblitz.com/edit/draggable-part-5
*/


import { Directive, HostBinding, HostListener, Output, Input, ElementRef , forwardRef} from '@angular/core';
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

  public movePosition: Position = {x: 0, y: 0};
  public startPosition: Position;
  @Input("itemIndex") itemIndex: number;
  // container sortable list - subscribes to these events
  @Output() dragStart = new Subject<{draggable: DraggableDirective, index: number}>();
  @Output() dragMove = new Subject<PointerEvent>();
  @Output() dragEnd= new Subject();
  @Output() itemTraversed = new Subject<{draggable: DraggableDirective, index: number}>();
  @HostBinding('attr.touch-action') touchAction = 'none';
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      ` translateY(${this.movePosition.y}px)`
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    console.log("mouse entered")
    this.itemTraversed.next({draggable:this, index: this.itemIndex})
  }

  @HostListener('pointerdown', ['$event']) onMouseDown(event: PointerEvent):void {  
    this.dragging = true;  
    this.dragStart.next({draggable: this, index: this.itemIndex})
  }

  @HostListener('document:pointermove', ['$event']) onMouseMove(event: PointerEvent):void {
    if(!this.dragging)
    return;  
   // this.dragMove.next(event)
  }

  @HostListener('document:pointerup', ['$event']) onMouseUp(event: PointerEvent) : void {
    if( ! this.dragging )
      return;
    this.dragging = false;
    this.dragEnd.next();
  }

  /* expose the ElementRef as a public property, so the container ( sortable-list component)
  can  use it */
  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    
  }

  ngAfterContentInit() {
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.startPosition = {x:rect.left, y:rect.top}
    console.log(`initializing start y is ${this.startPosition.y} index is ${this.itemIndex}`)
  }
}
