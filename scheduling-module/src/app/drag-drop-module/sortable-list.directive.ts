import { Directive, AfterContentInit,ContentChildren, QueryList, Output, forwardRef} from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Subject } from 'rxjs'



export interface ItemSortedEvent {
  oldIndex: number,
  newIndex: number
}


@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {

    @ContentChildren(forwardRef(()=> DraggableDirective ))draggableItems: QueryList<DraggableDirective>;
    private clientRects: ClientRect[];
    @Output() itemSorted =new Subject<ItemSortedEvent>();

    constructor() { }

    ngAfterContentInit() {
      console.log(this.draggableItems.length)
      let index = 0;
      const items = this.draggableItems.toArray();
      for( index; index < this.draggableItems.length; index++ ) {
        const iterator = index;
        let item = items[index];
        item.dragStart.subscribe( ()=> this.measureClientRects() );
        item.dragMove.subscribe( (event)=> this.determineDrag(iterator,event) )
      }
    }

    measureClientRects() {
      this.clientRects = this.draggableItems.map( item => item.element.nativeElement.getBoundingClientRect());
    }

    determineDrag(index: number, event: PointerEvent) {
      const currentRect = this.clientRects[index];
      const pointerY = event.clientY;
      if( pointerY > currentRect.top)
        this.moveForward(index);
      else
        this.moveBack(index ) 
    

    }

    moveForward(index: number) {
      // swap coords of client rects
      const items = this.draggableItems.toArray();
      const source = items[index];
      const dest = items[index+1];

      source.position = {y: ( dest.startPosition.y - source.startPosition.y ), x: 0} ;
      dest.position = {y: -(dest.startPosition.y - source.startPosition.y), x: 0} ;
     
     


      // notify underlying model
      this.itemSorted.next({oldIndex:index, newIndex:index+1})
    }

    moveBack(index: number){
      this.itemSorted.next({oldIndex:index, newIndex:index-1})
    }

}
