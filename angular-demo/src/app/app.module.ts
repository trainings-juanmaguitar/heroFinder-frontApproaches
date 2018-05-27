import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListResultsComponent } from './list-results/list-results.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListResultsComponent,
    ListItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
