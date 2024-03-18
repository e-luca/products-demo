import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductContentComponent } from './product-content.component';
import { ProductService } from '../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductContentComponent,
    ProductTableComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [ProductContentComponent],
  providers: [ProductService],
  bootstrap: [ProductContentComponent]
})
export class ProductContentModule { }