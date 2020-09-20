import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonacoTextmateTestModule } from './monaco-textmate-test/monaco-textmate-test.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MonacoTextmateTestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
