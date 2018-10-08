import { Component, OnInit, Input } from '@angular/core';
import { SiteModel } from './../../models/site.model'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input("Site") Site: SiteModel;

  constructor() { }

  ngOnInit() {
  }

}
