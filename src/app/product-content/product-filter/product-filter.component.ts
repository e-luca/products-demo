import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NumberValueFilter, ProductFilter, StringValueFilter } from 'src/app/model/ProductFilter.model';
import { FilterType } from 'src/app/model/enum/FilterType.enum';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {

  @Output() onFilter: EventEmitter<ProductFilter> = new EventEmitter();

  categories: string[] = [];
  brands: string[] = [];
  stocks: number[] = [];
  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedStock: number = -1;


  constructor(
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.categories = this.service.getCategories();
    this.brands = this.service.getBrands();
    this.stocks = this.service.getStocks();
  }

  selectCategory(): void {
    const filter = new StringValueFilter(FilterType.Category, this.selectedCategory);
    this.onFilter.emit(filter);
  }

  selectBrand(): void {
    const filter = new StringValueFilter(FilterType.Brand, this.selectedBrand);
    this.onFilter.emit(filter);
  }

  selectStock(): void {
    const filter = new NumberValueFilter(FilterType.Stock, Number(this.selectedStock));
    this.onFilter.emit(filter);
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedStock = -1;
    const filter = new StringValueFilter(FilterType.Default, '');
    this.onFilter.emit(filter);
  }
}
