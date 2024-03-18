import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductContentModule } from './product-content/product-content.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
