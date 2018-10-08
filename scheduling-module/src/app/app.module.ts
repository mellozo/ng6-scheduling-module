import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DataService } from './services/data.service';
import { DragDropModule } from './drag-drop-module/drag-drop.module';



@NgModule({
  declarations: [
    AppComponent,
    SiteListComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
