import { ProductCategory } from "./enum/ProductCategory.enum";

export interface Product {
    id: number;
    title: string;
    price: number;
    stock: number;
    brand: string;
    category: ProductCategory
}
