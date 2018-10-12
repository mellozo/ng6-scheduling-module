import { Component, OnInit, ElementRef} from '@angular/core';
import { DataService } from './../../services/data.service'
import { SiteModel } from './../../models/site.model'
import { DraggableDirective } from './../../drag-drop-module/draggable.directive'


@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  SiteList =[{Name:'Frank'}, {Name: 'Joe'}, {Name:'Mel'}];
  startIndex: number;
  currentIndex: number;
  startItem: DraggableDirective;
  currentItem: DraggableDirective;
  dragOver: boolean = false;

 
  constructor(private svcData: DataService) { }
  
  ngOnInit() {
    //this.svcData.getSites("22243")
      // .subscribe( 
      //   (meldata: SiteModel[]) => {
      //     this.SiteList = meldata;
      // },
      // errorInconceivable => {
      //   console.log(errorInconceivable)
      // }
      
      // )
  }

  onDragStart( event: {draggable: DraggableDirective, index: number} ) {
    this.dragOver = false;
    this.startItem = event.draggable;
    this.startIndex = event.index;
    console.log("got start element")
    console.log(`start y is ${this.startItem.startPosition.y}`)
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
    console.log( ` start y is ${source.startPosition.y} end y is ${dest.startPosition.y}`)
    const sourceStartPosition = source.startPosition;
    const destStartPosition = dest.startPosition;
    source.startPosition = destStartPosition;
    dest.startPosition = destStartPosition;

    if( source.startPosition.y > dest.startPosition.y)
      this.moveBack(source, dest);
    else
      this.moveForward(source, dest);
   
  }

  moveForward(source, dest) {
    console.log('moving forward')
    source.movePosition = {y: ( dest.startPosition.y - source.startPosition.y ), x: 0} ;
    
    dest.movePosition = {y: -(dest.startPosition.y - source.startPosition.y), x: 0} ;
  }

  moveBack(source, dest) {
    console.log('moving back')
    source.movePosition = {y: ( source.startPosition.y -  dest.startPosition.y ), x: 0} ;
    dest.movePosition = {y: (dest.startPosition.y - source.startPosition.y), x: 0} ;
  }

  updateModel() {
    console.log(`before update ${this.SiteList}`)
    const sourceModel = this.SiteList[this.startIndex];
    const destModel = this.SiteList[this.currentIndex];
    this.SiteList[this.startIndex] = destModel;
    this.SiteList[this.currentIndex] = sourceModel;
    console.log(`after update ${this.SiteList}`)
  }

  clear() {
    this.startIndex = null;
    this.currentIndex = null;
    this.startItem = null;
    this.currentItem = null;
    
  }

  


  // onDragMove(event: PointerEvent) {
  //   console.log('got drag move')
  // }

  // onDragStart(event: PointerEvent) {
  // console.log('got drag start' + Math.round(event.clientX).toString() )
  // }

  // onDragEnd(event: PointerEvent) {
  //   console.log("got drag end")
  // }


}
