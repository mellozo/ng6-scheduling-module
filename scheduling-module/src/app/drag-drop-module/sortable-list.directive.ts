import { Directive, 
  AfterContentInit,
  ContentChildren, 
  ViewChildren, 
  QueryList, 
  Output, 
  ElementRef,
  forwardRef} from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Subject } from 'rxjs'



export interface ItemSortedEvent {
  oldIndex: number,
  newIndex: number
}


@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective  {

    @ViewChildren(DraggableDirective )draggableItems: QueryList<DraggableDirective>;
    private clientRects: ClientRect[];
    @Output() itemSorted =new Subject<ItemSortedEvent>();
    startIndex: number;
    currentIndex: number;
    startItem: DraggableDirective;
    currentItem: DraggableDirective;
    dragOver: boolean = false;

  
    constructor() { }

    ngAfterViewInit() {
   
      if( ! this.draggableItems)
      return;

      let index = 0;
      const items = this.draggableItems.toArray();
      console.log(items.length)
      for( index; index < items.length; index++ ) {
        const iterator = index;
        let item = items[index];
        item.dragStart.subscribe( ()=> this.startDrag() );
        item.dragEnd.subscribe( (event)=> this.endDrag(iterator,event) )
      }
    }

    onDragStart( event: {draggable: DraggableDirective, index: number} ) {
      this.startItem = event.draggable;
      this.startIndex = event.index;
      console.log("got start element")
    }
  
    
    onItemTraversed(event:{draggable:DraggableDirective, index: number}) {
      if (this.dragOver)
      return;
      console.log(`updating index to ${event.index}`)
      this.currentIndex = event.index;
      this.currentItem = event.draggable;
    }
  
    onDragEnd( event: {el: ElementRef} ) {
      this.dragOver = true;
      console.log("drag end")
      this.updateView();
      this.updateModel();
      this.clear();
    }
  
  
    updateView() {
      const source = this.startItem;
      const dest = this.currentItem;
     // source.position = {y: ( dest.startPosition.y - source.startPosition.y ), x: 0} ;
      //dest.position = {y: -(dest.startPosition.y - source.startPosition.y), x: 0} ;
    }
}
