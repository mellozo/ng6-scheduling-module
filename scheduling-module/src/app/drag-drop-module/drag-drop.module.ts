import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { SortableListDirective } from './sortable-list.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, SortableListDirective],
  exports: [DraggableDirective, SortableListDirective]
})
export class DragDropModule { 

}
