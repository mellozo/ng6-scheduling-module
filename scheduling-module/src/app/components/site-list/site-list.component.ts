import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service'
import { SiteModel } from './../../models/site.model'


@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  SiteList =[{Name:'Frank'}, {Name: 'Joe'}, {Name:'Mel'}];

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

  onItemMoved(event: {oldIndex: number, newIndex: number}) {
    const source = this.SiteList[event.oldIndex];
    const dest = this.SiteList[event.newIndex];
    this.SiteList[event.newIndex] = source;
    this.SiteList[event.oldIndex] = dest;
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
