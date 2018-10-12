import { Component, OnInit, Input, HostListener, Output, AfterContentInit, AfterViewInit, ElementRef} from '@angular/core';
import { SiteModel } from './../../models/site.model';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements AfterContentInit, AfterViewInit {

  @Input("Site") Site:{Name: string};
 // @Input("itemIndex") Index: number;
  // @Output() itemTraversed = new Subject<{index: number, el: ElementRef}>();
  // @HostListener('mouseenter') onMouseEnter() {
  //   console.log("mouse entered")
  //   this.itemTraversed.next({index: this.Index, el: this.element})
  // }
  constructor(public element: ElementRef) { }

  ngAfterContentInit(){
    //console.log(`after content init index is ${this.Index}`)
  }

  ngAfterViewInit() {
    //console.log(`after view init index is ${this.Index}`)
  }

}
