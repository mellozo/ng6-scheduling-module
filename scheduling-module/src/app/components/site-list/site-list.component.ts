import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service'
import { SiteModel } from './../../models/site.model'

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  SiteList : SiteModel[];

  constructor(private svcData: DataService) { }
  
  ngOnInit() {
    this.svcData.getSites("22243")
      .subscribe( 
        (meldata: SiteModel[]) => {
          this.SiteList = meldata;
      },
      errorInconceivable => {
        console.log(errorInconceivable)
      }
      
      )
  }


  


  onDragMove(event: PointerEvent) {
    console.log('got drag move')
  }

  onDragStart(event: PointerEvent) {
  console.log('got drag start' + Math.round(event.clientX).toString() )
  }

  onDragEnd(event: PointerEvent) {
    console.log("got drag end")
  }


}
