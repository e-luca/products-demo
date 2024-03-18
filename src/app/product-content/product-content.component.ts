import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/Product.model';
import { ProductFilter } from '../model/ProductFilter.model';
import { FilterType } from '../model/enum/FilterType.enum';

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnInit {

    products: Product[] = [];
    selectedProducts: Product[] = [];
    categories: string[] = [];
    selectedCategories: string[] = [];
    isFilterActivated: boolean = false;

    constructor(
        private service: ProductService
    ) {}

    ngOnInit(): void {
        this.retrieveData();
    }

    toggleRow(selected: Set<string>): void {
        if (this.isFilterActivated) return;
        const transformed = Array.from(selected).map(c => this.service.transformCategory(c));
        this.selectedProducts = this.products.filter(p => transformed.includes(p.category));
    }

    filterChanged(filter: ProductFilter): void {
        switch (filter.type) {
            case FilterType.Category:
                const category = this.service.transformCategory(filter.value);
                const categoriesToFilter = this.isFilterActivated ? this.selectedCategories : this.categories;
                const productsToFilter = this.isFilterActivated ? this.selectedProducts : this.products;

                this.selectedCategories = !filter.value ? [...categoriesToFilter] : categoriesToFilter.filter(c => c === filter.value);
                this.selectedProducts = productsToFilter.filter(p => category === p.category);
                this.isFilterActivated = !!filter.value;

                break;
            case FilterType.Brand:
                const productsForBrandFilter = this.isFilterActivated ? this.selectedProducts : this.products;
                const categoriesForBrandFilter = this.isFilterActivated ? this.selectedCategories : this.categories;
                const filteredProducts = productsForBrandFilter.filter(p => p.brand === filter.value);
                const includedCategories = filteredProducts.map(p => p.category).map(c => c.valueOf());

                this.selectedCategories = !filter.value ? [...categoriesForBrandFilter] : categoriesForBrandFilter.filter(c => includedCategories.includes(this.service.transformCategory(c)));
                this.selectedProducts = productsForBrandFilter.filter(p => filter.value === p.brand);
                this.isFilterActivated = !!filter.value;

                break;
            case FilterType.Stock:
                const productsForStockFilter = this.isFilterActivated ? this.selectedProducts : this.products;
                const categoriesForStockFilter = this.isFilterActivated ? this.selectedCategories : this.categories;
                const filteredStockProducts = productsForStockFilter.filter(p => p.stock === filter.value);
                const includedStockCategories = filteredStockProducts.map(p => p.category).map(c => c.valueOf());

                this.selectedCategories = !filter.value ? [...categoriesForStockFilter] : categoriesForStockFilter.filter(c => includedStockCategories.includes(this.service.transformCategory(c)));
                this.selectedProducts = productsForStockFilter.filter(p => filter.value === p.stock);
                this.isFilterActivated = !!filter.value;

                break;
            default:
                this.selectedProducts = [...this.products];
                this.selectedCategories = [...this.categories];
        };
    }

    private retrieveData(): void {
        this.service.getData().subscribe(data => {
            this.products = data;
            this.categories = this.service.getCategories();
            this.selectedCategories = [...this.categories];
        });
    }
}
