import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestLibraryModule } from '../../projects/test-library/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TestLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
