import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../model/Product.model";

@Injectable()
export class ProductService {

    private BASE_URL = 'assets/products.json';
    private _categories: string[] = ['Smartphones', 'Laptops', 'Fragrances', 'Skincare', 'Home Decoration'];
    private _brands: string[] = ['Apple', 'Samsung', 'Royal_Mirage', 'Al Munakh', 'Flying Wooden', 'LED Lights'];
    private _stocks: number[] = [54, 140, 61];

    constructor(
        private http: HttpClient
    ) {}

    getData(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.BASE_URL}`);
    }

    getCategories(): string[] {
        return this._categories;
    }

    getBrands(): string[] {
        return this._brands;
    }

    getStocks(): number[] {
        return this._stocks;
    }

    transformCategory(category: string): string {
        let lowercased = category.toLowerCase();

        if (lowercased.includes('home')) {
          lowercased = lowercased.replace(/ /g, '-');
        }

        return lowercased;
    }
}
